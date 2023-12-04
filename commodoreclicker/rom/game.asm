.code

GAMEFLAGS = $DE00
SPR_X_LO  = $10
SPR_X_HI  = $11
SPR_Y     = $12
SCR_RAM   = $13
COL_RAM   = $15
SCR_RAM2  = $15
RASTER_LO = $17
RASTER_HI = $18
RASTERBAR = $19
SCROLLPOS = $1A
BGCOL     = $1B

TMP0      = $30
TMP1      = $31

reset:
    ;--- VIC setup --------------------------------------------------------
    sei
    lda #$1b            ; Standard text mode
    sta TMP1
    lda #$0f            ; Enable all interrupts
    sta $d01a
    lda #44             ; Interrupt at line 300
    sta $d012           ; (within vblank)
    sta RASTER_LO
    lda #1
    sta RASTER_HI       ; And store 304 for the IRQ
    lda #0
    sta RASTERBAR       ; Start off with no rasterbars

    lda #<handler_raster
    sta $0314
    lda #>handler_raster
    sta $0315

    ;--- CIA interrupt setup ----------------------------------------------
    lda #$7f
    sta $dc0d
    sta $dd0d           ; Disable interrupts on both CIAs
    lda $dc0d
    lda $dd0d           ; Acknowledge interrupts on both CIAs

    cli                 ; Turn interrupts back on

    ;--- Sprite loading ---------------------------------------------------
    ldx #62
sprlp:
    lda sprdata, x
    sta $3fc0, x
    dex
    bne sprlp

    lda #$ff            ; Set pointer for sprite 0
    sta $07f8
    lda #$80            ; Set sprite 0 X and Y
    sta $d000
    sta $d001
    sta SPR_X_LO
    sta SPR_Y
    lda #0
    sta SPR_X_HI
    lda #$07            ; Sprite 0 is yellow
    sta $d027

    ;--- We're done, spin forever -----------------------------------------
    jmp *

;--------------------------------------------------------------------------
; Raster interrupt handler!
handler_raster:
    pla
    pla                 ; Pop Y and X off the stack
    dec $d019           ; Acknowledge

    ;--- Check if this was the CIA interrupting ---------------------------
    lda $dc0d
    bne handler_cia

    ;--- Change the border color ------------------------------------------
raster_bars:
    lda $d020
    adc RASTERBAR
    sta $d020

    ;--- Increment raster trap point by 12 --------------------------------
raster_inc:
    lda $d012
    adc #12             ; (Carry is cleared above)
    sta RASTER_LO
    sta $d012           ; And write to VIC
    lda RASTER_HI       ; 16-bit addition
    adc #0
    sta RASTER_HI
    ror                 ; Again, carry is clear, so
    ror                 ; this rotates bit 0 to bit 7
    ora TMP1            ; Set the original VIC flags
    sta $d011

    rol
    bcc raster_notop    ; If the high bit is 1,
    lda RASTER_LO
    cmp #50             ; and the low byte is
    bcc raster_notop    ; >= 44 or so, then
    lda #1              
    sta $d012
    sta RASTER_LO
    lda #0
    sta RASTER_HI       ; Go back to the top (line 1)
    lda TMP1
    sta $d011
    bne vbl_frame       ; Skip over to do the per-frame work

raster_notop:
    pla
    rti                 ; Leaving the handler early!

    ;--- CIA handler (within relative-jump range of the top of handler) ---
handler_cia:
    lda GAMEFLAGS
    and #16             ; Bit 4 of GAMEFLAGS
    beq cia_end         ; is "background change on"
    lda BGCOL
    adc #3
    sta BGCOL
    sta $d021           ; Change the background color
cia_end:
    pla
    rti                 ; Leaving the handler

    ;--- Per-frame events: scrollshake ------------------------------------
vbl_frame:
    txa
    pha

    lda GAMEFLAGS
    and #1              ; Bit 0 of GAMEFLAGS
    beq vbl_shake       ; is "rasterbars on"
    lda #3              ; If it's on, we'll add 3 to
    sta RASTERBAR       ; the color every 12 lines

vbl_shake:
    lda GAMEFLAGS
    and #2              ; Bit 1 of GAMEFLAGS
    beq vbl_kb          ; is "scrollshake on"
    lda SCROLLPOS
    clc
    adc #$1b            ; Add 3 to Y, and 5 to X
    sta SCROLLPOS       ; to simulate "random"
    tax

    lda $d016
    and #$f8            ; Mask off and save the
    sta TMP0            ; top 5 bits of D016
    txa
    and #7              ; Mask in the X component
    ora TMP0            ; And tack them together
    sta $d016

    lda $d011
    and #$f8            ; Do the same for D011
    sta TMP0
    txa
    lsr                 ; This time, push the
    lsr                 ; Y component into place
    lsr                 ; before we do the masking
    and #7              ; of the bottom 3 bits
    ora TMP0            ; Tack them together too
    sta $d011
    and #$7f
    sta TMP1

    ;--- Per-frame events: Move sprite by joystick direction --------------
vbl_kb:
    ldx $dc00           ; Get Joy2's status

vbl_kb_up:
    txa
    and #1              ; Check bit 0 (UP)
    bne vbl_kb_down
    dec SPR_Y           ; If it's set, move up

vbl_kb_down:
    txa
    and #2              ; Check bit 1 (DOWN)
    bne vbl_kb_right
    inc SPR_Y           ; If it's set, move down

vbl_kb_right:
    txa
    and #8              ; Check bit 3 (RIGHT)
    bne vbl_kb_left
    lda SPR_X_LO        ; If it's set, perform a
    clc                 ; 16-bit addition of 1
    adc #1              ; and mask it down to 0-511
    sta SPR_X_LO
    lda SPR_X_HI
    adc #0
    and #1
    sta SPR_X_HI

vbl_kb_left:
    txa
    and #4              ; Check bit 2 (LEFT)
    bne vbl_kb_end
    lda SPR_X_LO        ; If it's set, perform a
    clc                 ; 16-bit subtraction of 1
    sbc #1              ; and mask it down to 0-511
    sta SPR_X_LO
    lda SPR_X_HI
    sbc #0
    and #1
    sta SPR_X_HI

vbl_kb_end:
    lda SPR_X_LO        ; Positions have been determined,
    sta $d000           ; set them
    lda SPR_X_HI        ; We don't worry about the X-pos
    sta $d010           ; of any other sprites
    ldx SPR_Y
    stx $d001

    ;--- Per-frame events: Check if sprite is enabled ---------------------
vbl_spr:
    lda GAMEFLAGS
    tax
    and #4              ; Bit 2 of GAMEFLAGS
    beq vbl_sprdbl      ; is "sprite on"
    lda #1
    sta $d015
vbl_sprdbl:
    txa
    and #8              ; Bit 3 of GAMEFLAGS
    beq raster_end      ; is "sprite doubled"
    lda #1
    sta $d017
    sta $d01d

    ;--- End of handler: we skipped to here for mid-frame rasters ---------
raster_end:
    pla
    tax
raster_endx:
    pla
    rti

;--------------------------------------------------------------------------
sprdata:
    .byt 0, 126, 0, 3, 255, 192, 7, 255, 224
    .byt 31, 255, 248, 31, 255, 248, 63, 255, 252
    .byt 127, 255, 254, 127, 254, 254, 255, 253, 255
    .byt 255, 251, 255, 255, 247, 255, 255, 239, 255
    .byt 255, 223, 255, 127, 191, 254, 127, 127, 254
    .byt 63, 255, 252, 31, 255, 248, 31, 255, 248
    .byt 7, 255, 224, 3, 255, 192, 0, 126, 0
