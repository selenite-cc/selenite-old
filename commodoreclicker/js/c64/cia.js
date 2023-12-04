define(function() {
    return {
        JOY_UP: 1,
        JOY_DOWN: 2,
        JOY_LEFT: 4,
        JOY_RIGHT: 8,
        JOY_FIRE: 16,

        IEC_ID: 255,

        timers: [],
        CNTPIN: null,
        CNTPIN_prev: null,
        vicBank: null,

        IRQ: null,
        IRM: null,

        currJoyPort: null,
        currJoyState: null,

        registers: [
            // CIA1: peripherals/IRQ
            [
                0, // Port A
                0, // Port B
                0, // Port A direction
                0, // Port B direction
                0, // Timer A low byte
                0, // Timer A high byte
                0, // Timer B low byte
                0, // Timer B high byte
                0, // RTC tenth-of-sec
                0, // RTC sec
                0, // RTC min
                0, // RTC hour
                0, // Shift register
                0, // IRQ source
                0, // Timer A control
                0  // Timer B control
            ],

            // CIA2: RS232/NMI
            [
                0, // Port A
                0, // Port B
                0, // Port A direction
                0, // Port B direction
                0, // Timer A low byte
                0, // Timer A high byte
                0, // Timer B low byte
                0, // Timer B high byte
                0, // RTC tenth-of-sec
                0, // RTC sec
                0, // RTC min
                0, // RTC hour
                0, // Shift register
                0, // NMI source
                0, // Timer A control
                0  // Timer B control
            ]
        ],

        keysPressed: null,
        keymap: {
            27: 63,     // Esc: Run/Stop
            112: 4,     // F1: F1
            113: 5,     // F2: F3
            114: 6,     // F3: F5
            115: 3,     // F4: F7
            116: 54,    // F5: Arrow Up
            117: 48,    // F6: Pound
            118: 51,    // F7: Home
            119: 'NMI', // F8: Restore

            192: 57,    // `: Arrow Left
            49: 56,     // 1: 1
            50: 59,     // 2: 2
            51: 8,      // 3: 3
            52: 11,     // 4: 4
            53: 16,     // 5: 5
            54: 19,     // 6: 6
            55: 24,     // 7: 7
            56: 27,     // 8: 8
            57: 32,     // 9: 9
            48: 35,     // 0: 0
            189: 40,    // -: +
            187: 43,    // =: -
            8: 0,       // Bksp: Del

            9: 58,      // Tab: Control
            81: 62,     // Q: Q
            87: 9,      // W: W
            69: 14,     // E: E
            82: 17,     // R: R
            84: 22,     // T: T
            89: 25,     // Y: Y
            85: 30,     // U: U
            73: 33,     // I: I
            79: 38,     // O: O
            80: 41,     // P: P
            219: 46,    // [: @
            221: 49,    // ]: *
            220: 53,    // \: =

            65: 10,     // A: A
            83: 13,     // S: S
            68: 18,     // D: D
            70: 21,     // F: F
            71: 26,     // G: G
            72: 29,     // H: H
            74: 34,     // J: J
            75: 37,     // K: K
            76: 42,     // L: L
            186: 45,    // ;: :
            222: 50,    // ': ;
            13: 1,      // Enter: Return

            16: 15,     // Shift: Left Shift
            90: 12,     // Z: Z
            88: 23,     // X: X
            67: 20,     // C: C
            86: 31,     // V: V
            66: 28,     // B: B
            78: 39,     // N: N
            77: 36,     // M: M
            188: 47,    // ,: ,
            190: 44,    // .: .
            191: 55,    // /: /

            17: 61,     // Ctrl: C=
            91: 7,      // Left Win: Cursor Down
            32: 60,     // Space: Space
            93: 2,      // Right Win: Cursor Right
            18: 'FIRE', // Alt: Joystick Fire
            37: 'L',    // Left: Joystick Left
            38: 'U',    // Up: Joystick Up
            39: 'R',    // Right: Joystick Right
            40: 'D'     // Down: Joystick Down
        },

        io_r: function(addr) {
            var i, j, chip = (addr & 0x0100) ? 1 : 0;
            addr &= 0x0F;
            switch (addr) {
                case 0: // Port A
                    if (chip) {
                        this.registers[1][0] &= 0xFC;
                        this.registers[1][0] |= (3 - this.vicBank);
                    } else {
                        for (i = 7; i >= 0; i--) {
                            j = 1 << i;
                            if (this.currJoyPort == addr) {
                                this.registers[0][addr] &= (255 - j);
                                this.registers[0][addr] |= (this.currJoyState & j);
                            }
                        }
                    }
                    break;
                case 1: // Port B
                    if (chip) {
                        // TODO: RS232
                    } else {
                        this.registers[0][1] = 255;
                        for (i = 0; i < this.keysPressed.length; i++) {
                            j = this.keysPressed[i] >> 3;
                            if (!(this.registers[0][0] & (1 << j))) {
                                // Keyboard column is cleared, clear row
                                j = this.keysPressed[i] & 7;
                                this.registers[0][1] &= (255 - (1 << j));
                            }
                        }
                        for (i = 7; i >= 0; i--) {
                            j = 1 << i;
                            if (this.currJoyPort == addr) {
                                this.registers[0][addr] &= (255 - j);
                                this.registers[0][addr] |= (this.currJoyState & j);
                            }
                        }
                    }
                    break;
                case 4: // Timer A lo
                    this.registers[chip][addr] = this.timers[chip][0].value & 255;
                    break;
                case 5: // Timer A hi
                    this.registers[chip][addr] = this.timers[chip][0].value >> 8;
                    break;
                case 7: // Timer B lo
                    this.registers[chip][addr] = this.timers[chip][1].value & 255;
                    break;
                case 8: // Timer B hi
                    this.registers[chip][addr] = this.timers[chip][1].value >> 8;
                    break;
                case 13: // IRQ
                    this.registers[chip][addr] = this.IRQ[chip];
                    this.IRQ[chip] = 0;
                    break;
            }
            return this.registers[chip][addr];
        },
        io_w: function(addr, val) {
            var prevRunning, i, j, chip = (addr & 0x0100) ? 1 : 0;
            addr &= 0x0F;
            val &= 255;

            switch (addr) {
                case 0:
                    if (chip) {
                        this.vicBank = (3 - (val & 3));
                        this.owner.IEC[val & 8 ? 'pulldown' : 'release'](this.IEC_ID, 'ATN');
                        this.owner.IEC[val & 16 ? 'pulldown' : 'release'](this.IEC_ID, 'CLK');
                        this.owner.IEC[val & 32 ? 'pulldown' : 'release'](this.IEC_ID, 'DATA');
                    }
                    break;
                case 4: // Timer A lo latch
                    this.timers[chip][0].latch &= 0xFF00;
                    this.timers[chip][0].latch |= val;
                    return;
                case 5: // Timer A hi latch
                    this.timers[chip][0].latch &= 0x00FF
                    this.timers[chip][0].latch |= (val << 8);
                    return;
                case 6: // Timer B lo latch
                    this.timers[chip][1].latch &= 0xFF00;
                    this.timers[chip][1].latch |= val;
                    return;
                case 7: // Timer B hi latch
                    this.timers[chip][1].latch &= 0x00FF;
                    this.timers[chip][1].latch |= (val << 8);
                    return;
                case 13: // IRM
                    if (val & 31) {
                        this.IRM[chip] = (val & 31) ^ ((val & 128) ? 0 : 31);
                    }
                    break;
                case 14: // Timer A control
                    prevRunning = this.timers[chip][0].running;
                    this.timers[chip][0].running = !!(val & 1);
                    this.timers[chip][0].oneshot = !!(val & 8);
                    this.timers[chip][0].latchroll = !(val & 16);
                    this.timers[chip][0].mode = (val & 32) >> 5;
                    if (!this.timers[chip][0].running) {
                        this.timers[chip][0].latch &= 255;
                    }
                    if (!prevRunning && this.timers[chip][0].running) {
                        this.timers[chip][0].value = this.timers[chip][0].latch;
                    }
                    break;
                case 15: // Timer B control
                    prevRunning = this.timers[chip][1].running;
                    this.timers[chip][1].running = !!(val & 1);
                    this.timers[chip][1].oneshot = !!(val & 8);
                    this.timers[chip][1].latchroll = !(val & 16);
                    this.timers[chip][1].mode = (val & 96) >> 5;
                    if (!this.timers[chip][1].running) {
                        this.timers[chip][1].latch &= 255;
                    }
                    if (!prevRunning && this.timers[chip][1].running) {
                        this.timers[chip][1].value = this.timers[chip][1].latch;
                    }
                    break;
            }

            this.registers[chip][addr] = val & 255;
        },
        handlers: {
            keydown: function(e) {
                var i, k = this.keymap[e.keyCode];
                if (k === undefined) {
                    return;
                }

                e.preventDefault();
                switch (k) {
                    case 'L':
                        $('#joy_left').addClass('active');
                        this.currJoyState &= (255 - this.JOY_LEFT);
                        break;
                    case 'U':
                        $('#joy_up').addClass('active');
                        this.currJoyState &= (255 - this.JOY_UP);
                        break;
                    case 'R':
                        $('#joy_right').addClass('active');
                        this.currJoyState &= (255 - this.JOY_RIGHT);
                        break;
                    case 'D':
                        $('#joy_down').addClass('active');
                        this.currJoyState &= (255 - this.JOY_DOWN);
                        break;
                    case 'FIRE':
                        $('#joy_fire').addClass('active');
                        this.currJoyState &= (255 - this.JOY_FIRE);
                        break;
                    case 'NMI':
                        this.owner.IEC.signal('RESET');
                        this.owner.CPU.signal('NMI');
                        break;
                    default:
                        i = this.keysPressed.indexOf(k);
                        if (i == -1) {
                            this.keysPressed.push(k);
                        }
                        break;
                }
            },
            keyup: function(e) {
                var i, k = this.keymap[e.keyCode];
                if (k === undefined) {
                    return;
                }

                e.preventDefault();
                switch (k) {
                    case 'L':
                        $('#joy_left').removeClass('active');
                        this.currJoyState |= this.JOY_LEFT;
                        break;
                    case 'U':
                        $('#joy_up').removeClass('active');
                        this.currJoyState |= this.JOY_UP;
                        break;
                    case 'R':
                        $('#joy_right').removeClass('active');
                        this.currJoyState |= this.JOY_RIGHT;
                        break;
                    case 'D':
                        $('#joy_down').removeClass('active');
                        this.currJoyState |= this.JOY_DOWN;
                        break;
                    case 'FIRE':
                        $('#joy_fire').removeClass('active');
                        this.currJoyState |= this.JOY_FIRE;
                        break;
                    case 'NMI':
                        break;
                    default:
                        i = this.keysPressed.indexOf(k);
                        if (i >= 0) {
                            this.keysPressed.splice(i, 1);
                        }
                        break;
                }
            }
        },
        getState: function() {
            var t = [], i, j;
            for (i = 0; i < 2; i++) {
                t[i] = [];
                for (j = 0; j < 2; j++) {
                    t[i][j] = $.extend({}, this.timers[i][j])
                }
            }
            return {
                CIA1: this.registers[0].slice(0),
                CIA2: this.registers[1].slice(0),
                timers: t
            }
        },
        setState: function(state) {
            var t = [], i, j;
            for (i = 0; i < 2; i++) {
                t[i] = [];
                for (j = 0; j < 2; j++) {
                    t[i][j] = $.extend({}, state.timers[i][j])
                }
            }
            for (i in state.CIA1) {
                this.io_w(i, state.CIA1[i]);
            }
            for (i in state.CIA2) {
                this.io_w(0x0100 | i, state.CIA2[i]);
            }
            this.registers[0][this.currJoyPort] &= 0xE0;
            this.registers[0][this.currJoyPort] |= this.currJoyState;

            this.registers[1][0] &= 0x3F;
            if (!this.owner.IEC.check('CLK')) {
                this.registers[1][0] |= 0x40;
            }
            if (!this.owner.IEC.check('DATA')) {
                this.registers[1][0] |= 0x80;
            }
            this.timers = t;
        },
        step: function() {
            this.CNTPIN_prev = this.CNTPIN;

            var i, j, timer, dec;
            for (i = 0; i < 2; i++) {
                for (j = 0; j < 2; j++) {
                    timer = this.timers[i][j];
                    if (timer.running) {
                        if (timer.value == 0) {
                            timer.underflowed = true;
                            if (timer.oneshot) {
                                timer.running = false;
                            } else {
                                timer.value = timer.latchroll ? timer.latch : 65535;
                            }
                            if (j) {
                                this.IRQ[i] |= 0x02;
                                if (this.IRM[i] & 2) {
                                    this.IRQ[i] |= 0x80;
                                    this.owner.CPU.signal('INT');
                                }
                            } else {
                                this.IRQ[i] |= 0x01;
                                if (this.IRM[i] & 1) {
                                    this.IRQ[i] |= 0x80;
                                    this.owner.CPU.signal('INT');
                                }
                            }
                        } else {
                            timer.underflowed = false;
                            switch (j * 4 + timer.mode) {
                                // Timer A: clock
                                case 0:
                                    dec = true;
                                    break;
                                // Timer A: positive slope on CNT
                                case 1:
                                    dec = this.CNTPIN && !this.CNTPIN_prev;
                                    break;

                                // Timer B: clock
                                case 4:
                                    dec = true;
                                    break;
                                // Timer B: positive slope on CNT
                                case 5:
                                    dec = this.CNTPIN && !this.CNTPIN_prev;
                                    break;
                                // Timer B: A underflow
                                case 6:
                                    dec = this.timers[i][0].underflowed;
                                    break;
                                // Timer B: A underflow and +ve slope on CNT
                                case 7:
                                    dec = this.timers[i][0].underflowed && this.CNTPIN && !this.CNTPIN_prev;
                                    break;
                            }
                            if (dec) {
                                timer.value--;
                            }
                        }
                    }
                }
            }

            this.registers[1][0] &= 0x3F;
            if (!this.owner.IEC.check('CLK')) {
                this.registers[1][0] |= 0x40;
            }
            if (!this.owner.IEC.check('DATA')) {
                this.registers[1][0] |= 0x80;
            }
        },
        reset: function() {
            // All pins are pulled high on the data ports
            this.registers[0][0] = 255;
            this.registers[0][1] = 255;
            this.registers[1][0] = 255;
            this.registers[1][1] = 255;

            this.currJoyPort = 0;
            this.currJoyState = 31;
            this.CNTPIN = false;
            this.CNTPIN_prev = false;
            this.IRQ = [0,0];
            this.IRM = [0,0];
            this.keysPressed = [];
            this.vicBank = 0;
            this.owner.IEC.register(this.IEC_ID);

            var i, j;
            this.timers.length = 0;
            for (i = 0; i < 2; i++) {
                this.timers[i] = [];
                for (j = 0; j < 2; j++) {
                    this.timers[i][j] = {
                        mode: 0,
                        running: false,
                        underflowed: false,
                        oneshot: false,
                        latchroll: false,
                        latch: 0,
                        value: 0
                    };
                }
            }
        },
        init: function() {
            this.reset();
            $(document)
                .on('keydown', this.handlers.keydown.bind(this))
                .on('keyup', this.handlers.keyup.bind(this));
        }
    };
});
