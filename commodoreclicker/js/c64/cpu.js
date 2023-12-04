define(function() {
    return {
        VECTOR_INT: 0xFFFE,
        VECTOR_RESET: 0xFFFC,
        VECTOR_NMI: 0xFFFA,

        clock: null,
        printedTo: null,

        curOp: [],
        curCycle: null,
        reg: null,
        halted: null,
        signalled: null,
        util: {
            setFlag: function(flag, cond) {
                if (cond) {
                    this.reg.P |= flag;
                } else {
                    this.reg.P &= (255 - flag);
                }
            },
            setNZ: function(val) {
                if (val & 128) {
                    this.reg.P |= this.flags.N;
                } else {
                    this.reg.P &= (255 - this.flags.N);
                }

                if (val == 0) {
                    this.reg.P |= this.flags.Z;
                } else {
                    this.reg.P &= (255 - this.flags.Z);
                }
            },
            branch: function(flag, val) {
                if ((this.reg.P & flag) == val) {
                    this.reg.PC = this.reg.addr;
                    if (!this.reg.tmp4) {
                        this.reg.tmp4 = 1;
                        return false;
                    } else if ((this.reg.addr & 0xFF00) != (this.reg.tmp1 & 0xFF00)) {
                        if (this.reg.tmp4 == 1) {
                            this.reg.tmp4 = 2;
                            return false;
                        }
                    }
                }
                return true;
            },
            push: function(val) {
                this.owner.MMU.w(this.reg.S + 0x0100, val);
                this.reg.S = (this.reg.S - 1) & 0x00FF;
            },
            pop: function() {
                this.reg.S = (this.reg.S + 1) & 0x00FF;
                return this.owner.MMU.r(this.reg.S + 0x0100);
            },
            interrupt: function(vector, brk_flag, reset_flag) {
                // This gets a bit messy, handling all the int types:
                // BRK changes PC, and sets the B flag
                // RESET doesn't push PC, and doesn't set I
                switch (this.reg.tmp4) {
                    case null:
                        this.reg.tmp4 = 1;
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        return false;
                    case 1:
                        this.reg.tmp4 = reset_flag ? 3 : 2;
                        if (!brk_flag) {
                            // Rewind the changes made in previous cycles
                            this.reg.PC = (this.reg.PC - 2) & 0xFFFF;
                        }
                        if (!reset_flag) {
                            this.util.push.call(this, this.reg.PC >> 8);
                        }
                        return false;
                    case 2:
                        this.reg.tmp4 = 3;
                        if (!reset_flag) {
                            this.util.push.call(this, this.reg.PC & 255);
                        }
                        return false;
                    case 3:
                        this.reg.tmp4 = 4;
                        if (reset_flag) {
                            return false;
                        }
                        if (brk_flag) {
                            this.reg.P |= this.flags.B;
                        } else {
                            this.reg.P &= (255 - this.flags.B);
                        }
                        this.util.push.call(this, this.reg.P);
                        if (reset_flag) {
                            this.reg.P &= (255 - this.flags.I);
                        } else {
                            this.reg.P |= this.flags.I;
                        }
                        return false;
                    case 4:
                        this.reg.tmp4 = 5;
                        this.reg.addr = this.owner.MMU.r(vector);
                        return false;
                    case 5:
                        this.reg.addr += (this.owner.MMU.r(vector + 1) << 8);
                        this.reg.PC = this.reg.addr;
                }
                return true;
            }
        },
        ops: {
            ADC: function() {
                var res = this.reg.operand + this.reg.A + ((this.reg.P & this.flags.C) ? 1 : 0);
                if (this.reg.P & this.flags.D) {
                    this.util.setFlag.call(this, this.flags.Z, (res & 255) == 0);
                    if ((this.reg.operand & 15) + (this.reg.A & 15) + ((this.reg.P & this.flags.C) ? 1 : 0) > 9) {
                        res += 6;
                    }
                    this.util.setFlag.call(this, this.flags.N, res & 128);
                    this.util.setFlag.call(this, this.flags.V,
                        (!((this.reg.A ^ this.reg.operand) & 128)) &&
                        ((this.reg.A ^ res) & 128)
                    );
                    if (res > 0x99) {
                        res += 0x60;
                    }
                    this.util.setFlag.call(this, this.flags.C, res > 0x99);
                } else {
                    this.util.setNZ.call(this, res & 255);
                    this.util.setFlag.call(this, this.flags.V,
                        (!((this.reg.A ^ this.reg.operand) & 128)) &&
                        ((this.reg.A ^ res) & 128)
                    );
                    this.util.setFlag.call(this, this.flags.C, res > 255);
                }

                this.reg.A = res & 255;
                return true;
            },
            AHX: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            ALR: function() {
                // TODO: Undocumented
                return true;
            },
            ANC: function() {
                // TODO: Undocumented
                return true;
            },
            AND: function() {
                this.reg.A = (this.reg.A & this.reg.operand) & 255;
                this.util.setNZ.call(this, this.reg.A);
                return true;
            },
            ARR: function() {
                // TODO: Undocumented
                return true;
            },
            ASL: function() {
                this.reg.writeflag = true;
                this.util.setFlag.call(this, this.flags.C, this.reg.operand & 128);
                this.reg.operand = (this.reg.operand << 1) & 255;
                this.util.setNZ.call(this, this.reg.operand);
                return true;
            },
            AXS: function() {
                // TODO: Undocumented
                return true;
            },
            BCC: function() {
                return this.util.branch.call(this, this.flags.C, 0);
            },
            BCS: function() {
                return this.util.branch.call(this, this.flags.C, this.flags.C);
            },
            BEQ: function() {
                return this.util.branch.call(this, this.flags.Z, this.flags.Z);
            },
            BIT: function() {
                this.util.setFlag.call(this, this.flags.N, this.reg.operand & 128);
                this.util.setFlag.call(this, this.flags.V, this.reg.operand & 64);
                this.util.setFlag.call(this, this.flags.Z, (this.reg.operand & this.reg.A) == 0);
                return true;
            },
            BMI: function() {
                return this.util.branch.call(this, this.flags.N, this.flags.N);
            },
            BNE: function() {
                return this.util.branch.call(this, this.flags.Z, 0);
            },
            BPL: function() {
                return this.util.branch.call(this, this.flags.N, 0);
            },
            BRK: function() {
                return this.util.interrupt.call(this, this.VECTOR_INT, true);
            },
            BVC: function() {
                return this.util.branch.call(this, this.flags.V, 0);
            },
            BVS: function() {
                return this.util.branch.call(this, this.flags.V, this.flags.V);
            },
            CLC: function() {
                this.reg.P &= (255 - this.flags.C);
                return true;
            },
            CLD: function() {
                this.reg.P &= (255 - this.flags.D);
                return true;
            },
            CLI: function() {
                this.reg.P &= (255 - this.flags.I);
                return true;
            },
            CLV: function() {
                this.reg.P &= (255 - this.flags.V);
                return true;
            },
            CMP: function() {
                var res = (this.reg.A - this.reg.operand) & 511;
                this.util.setFlag.call(this, this.flags.C, res < 256);
                this.util.setNZ.call(this, res & 255);
                return true;
            },
            CPX: function() {
                var res = (this.reg.X - this.reg.operand) & 511;
                this.util.setFlag.call(this, this.flags.C, res < 256);
                this.util.setNZ.call(this, res & 255);
                return true;
            },
            CPY: function() {
                var res = (this.reg.Y - this.reg.operand) & 511;
                this.util.setFlag.call(this, this.flags.C, res < 256);
                this.util.setNZ.call(this, res & 255);
                return true;
            },
            DCP: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            DEC: function() {
                this.reg.writeflag = true;
                this.reg.operand = (this.reg.operand - 1) & 255;
                this.util.setNZ.call(this, this.reg.operand);
                return true;
            },
            DEX: function() {
                this.reg.X = (this.reg.X - 1) & 255;
                this.util.setNZ.call(this, this.reg.X);
                return true;
            },
            DEY: function() {
                this.reg.Y = (this.reg.Y - 1) & 255;
                this.util.setNZ.call(this, this.reg.Y);
                return true;
            },
            EOR: function() {
                this.reg.A = (this.reg.A ^ this.reg.operand) & 255;
                this.util.setNZ.call(this, this.reg.A);
                return true;
            },
            HLT: function() {
                this.halted = true;
                return true;
            },
            INC: function() {
                this.reg.writeflag = true;
                this.reg.operand = (this.reg.operand + 1) & 255;
                this.util.setNZ.call(this, this.reg.operand);
                return true;
            },
            INT: function() {
                return this.util.interrupt.call(this, this.VECTOR_INT);
            },
            INX: function() {
                this.reg.X = (this.reg.X + 1) & 255;
                this.util.setNZ.call(this, this.reg.X);
                return true;
            },
            INY: function() {
                this.reg.Y = (this.reg.Y + 1) & 255;
                this.util.setNZ.call(this, this.reg.Y);
                return true;
            },
            ISC: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            JMP: function() {
                this.reg.PC = this.reg.addr;
                return true;
            },
            JSR: function() {
                switch (this.reg.tmp4) {
                    case null:
                        this.reg.tmp4 = 1;
                        this.reg.tmp3 = (this.reg.PC - 1) & 0xFFFF;
                        this.util.push.call(this, this.reg.tmp3 >> 8);
                        return false;
                    case 1:
                        this.reg.tmp4 = 2;
                        this.util.push.call(this, this.reg.tmp3 & 255);
                        return false;
                    case 2:
                        this.reg.PC = this.reg.addr;
                }
                return true;
            },
            LAS: function() {
                // TODO: Undocumented
                return true;
            },
            LAX: function() {
                // TODO: Undocumented
                return true;
            },
            LDA: function() {
                this.reg.A = this.reg.operand;
                this.util.setNZ.call(this, this.reg.A);
                return true;
            },
            LDX: function() {
                this.reg.X = this.reg.operand;
                this.util.setNZ.call(this, this.reg.X);
                return true;
            },
            LDY: function() {
                this.reg.Y = this.reg.operand;
                this.util.setNZ.call(this, this.reg.Y);
                return true;
            },
            LSR: function() {
                this.reg.writeflag = true;
                this.util.setFlag.call(this, this.flags.C, this.reg.operand & 1);
                this.reg.operand >>= 1;
                this.util.setNZ.call(this, this.reg.operand);
                return true;
            },
            NMI: function() {
                return this.util.interrupt.call(this, this.VECTOR_NMI);
            },
            NOP: function() {
                // lol
                return true;
            },
            ORA: function() {
                this.reg.A = (this.reg.A | this.reg.operand) & 255;
                this.util.setNZ.call(this, this.reg.A);
                return true;
            },
            PHA: function() {
                if (!this.reg.tmp3) {
                    this.reg.tmp3 = 1;
                    return false;
                }
                this.util.push.call(this, this.reg.A);
                return true;
            },
            PHP: function() {
                if (!this.reg.tmp3) {
                    this.reg.tmp3 = 1;
                    return false;
                }
                this.util.push.call(this, this.reg.P);
                return true;
            },
            PLA: function() {
                switch (this.reg.tmp4) {
                    case null:
                        this.reg.tmp4 = 1;
                        return false;
                    case 1:
                        this.reg.tmp4 = 2;
                        return false;
                    case 2:
                        this.reg.A = this.util.pop.call(this);
                        this.util.setNZ.call(this, this.reg.A);
                }
                return true;
            },
            PLP: function() {
                switch (this.reg.tmp4) {
                    case null:
                        this.reg.tmp4 = 1;
                        return false;
                    case 1:
                        this.reg.tmp4 = 2;
                        return false;
                    case 2:
                        this.reg.P = this.util.pop.call(this);
                }
                return true;
            },
            RLA: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            ROL: function() {
                this.reg.writeflag = true;
                this.reg.operand <<= 1;
                if (this.reg.P & this.flags.C) {
                    this.reg.operand |= 1;
                }
                this.util.setFlag.call(this, this.flags.C, this.reg.operand & 256);
                this.reg.operand &= 255;
                this.util.setNZ.call(this, this.reg.operand);
                return true;
            },
            ROR: function() {
                this.reg.writeflag = true;
                if (this.reg.P & this.flags.C) {
                    this.reg.operand |= 256;
                }
                this.util.setFlag.call(this, this.flags.C, this.reg.operand & 1);
                this.reg.operand >>= 1;
                this.util.setNZ.call(this, this.reg.operand);
                return true;
            },
            RRA: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            RST: function() {
                return this.util.interrupt.call(this, this.VECTOR_RESET, false, true);
            },
            RTI: function() {
                switch (this.reg.tmp4) {
                    case null:
                        this.reg.tmp4 = 1;
                        return false;
                    case 1:
                        this.reg.tmp4 = 2;
                        return false;
                    case 2:
                        this.reg.tmp4 = 3;
                        this.reg.P = this.util.pop.call(this);
                        return false;
                    case 3:
                        this.reg.tmp4 = 4;
                        this.reg.addr = this.util.pop.call(this);
                        return false;
                    case 4:
                        this.reg.addr += (this.util.pop.call(this) << 8);
                        this.reg.PC = this.reg.addr;
                }
                return true;
            },
            RTS: function() {
                switch (this.reg.tmp4) {
                    case null:
                        this.reg.tmp4 = 1;
                        return false;
                    case 1:
                        this.reg.tmp4 = 2;
                        return false;
                    case 2:
                        this.reg.tmp4 = 3;
                        this.reg.addr = this.util.pop.call(this);
                        return false;
                    case 3:
                        this.reg.tmp4 = 4;
                        this.reg.addr += (this.util.pop.call(this) << 8);
                        return false;
                    case 4:
                        this.reg.PC = (this.reg.addr + 1) & 0xFFFF;
                }
                return true;
            },
            SAX: function() {
                // TODO: Undocumented
                return true;
            },
            SBC: function() {
                var res = this.reg.A - this.reg.operand - ((this.reg.P & this.flags.C) ? 0 : 1);
                this.util.setNZ.call(this, res & 255);
                this.util.setFlag.call(this, this.flags.V,
                    ((this.reg.A ^ this.reg.operand) & 128) &&
                    ((this.reg.A ^ res) & 128)
                );
                if (this.reg.P & this.flags.D) {
                    if ((this.reg.A & 15) - ((this.reg.P & this.flags.C) ? 0 : 1) < (this.reg.operand & 15)) {
                        res -= 6;
                    }
                    if (res > 0x99) {
                        res -= 0x60;
                    }
                }
                this.util.setFlag.call(this, this.flags.C, !(res & 256));
                this.reg.A = res & 255;
                return true;
            },
            SEC: function() {
                this.reg.P |= this.flags.C;
                return true;
            },
            SED: function() {
                this.reg.P |= this.flags.D;
                return true;
            },
            SEI: function() {
                this.reg.P |= this.flags.I;
                return true;
            },
            SHX: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            SHY: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            SLO: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            SRE: function() {
                this.reg.writeflag = true;
                // TODO: Undocumented
                return true;
            },
            STA: function() {
                this.reg.writeflag = true;
                this.reg.writeonly = true;
                this.reg.operand = this.reg.A;
                return true;
            },
            STX: function() {
                this.reg.writeflag = true;
                this.reg.writeonly = true;
                this.reg.operand = this.reg.X;
                return true;
            },
            STY: function() {
                this.reg.writeflag = true;
                this.reg.writeonly = true;
                this.reg.operand = this.reg.Y;
                return true;
            },
            TAS: function() {
                // TODO: Undocumented
                return true;
            },
            TAX: function() {
                this.reg.X = this.reg.A;
                this.util.setNZ.call(this, this.reg.X);
                return true;
            },
            TAY: function() {
                this.reg.Y = this.reg.A;
                this.util.setNZ.call(this, this.reg.Y);
                return true;
            },
            TSX: function() {
                this.reg.X = this.reg.S;
                this.util.setNZ.call(this, this.reg.X);
                return true;
            },
            TXA: function() {
                this.reg.A = this.reg.X;
                this.util.setNZ.call(this, this.reg.A);
                return true;
            },
            TXS: function() {
                this.reg.S = this.reg.X;
                return true;
            },
            TYA: function() {
                this.reg.A = this.reg.Y;
                this.util.setNZ.call(this, this.reg.A);
                return true;
            },
            XAA: function() {
                // TODO: Undocumented
                return true;
            }
        },
        addr: {
            imp: function() {
                // Nothing to do except suck up 1 cycle
                return true;
            },
            imp_w: function() {
                return true;
            },
            acc: function() {
                this.reg.operand = this.reg.A;
                return true;
            },
            acc_w: function() {
                this.reg.A = this.reg.operand;
                return true;
            },
            imm: function() {
                if (this.curOp.length == 1) {
                    this.curOp.push(this.owner.MMU.r(this.reg.PC));
                    this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                    this.reg.operand = this.curOp[1];
                }
                return true;
            },
            imm_w: function() {
                return true;
            },
            z: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.addr = this.curOp[1];
                        return false;
                    case 2:
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            z_w: function() {
                if (!this.reg.writeonly && this.curCycle < 5) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            zx: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        if (this.reg.addr === null) {
                            this.reg.tmp1 += this.reg.X;
                            this.reg.addr = this.reg.tmp1 & 0xFF;
                            return false;
                        }
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            zx_w: function() {
                if (!this.reg.writeonly && this.curCycle < 6) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            zy: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        if (this.reg.addr === null) {
                            this.reg.tmp1 += this.reg.Y;
                            this.reg.addr = this.reg.tmp1 & 0xFF;
                            return false;
                        }
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            zy_w: function() {
                if (!this.reg.writeonly && this.curCycle < 6) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            abs: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.addr = (this.curOp[2] << 8) + this.reg.tmp1;
                        if (
                          this.map[this.curOp[0]][0] == 'JMP' ||
                          this.map[this.curOp[0]][0] == 'JSR'
                        ) {
                            // Operand not required
                            return true;
                        }
                        return false;
                    case 3:
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            abs_w: function() {
                if (!this.reg.writeonly && this.curCycle < 6) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            abx: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp2 = (this.curOp[2] << 8) + this.reg.tmp1;
                        return false;
                    case 3:
                        if (this.reg.addr === null) {
                            this.reg.addr = (this.reg.tmp2 + this.reg.X) & 0xFFFF;
                            if ((this.reg.tmp2 & 0xFF00) != (this.reg.addr & 0xFF00)) {
                                // Page boundary, add a cycle
                                return false;
                            }
                        }
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            abx_w: function() {
                if (this.curCycle < (this.reg.writeonly ? 5 : 7)) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            aby: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp2 = (this.curOp[2] << 8) + this.reg.tmp1;
                        return false;
                    case 3:
                        if (this.reg.addr === null) {
                            this.reg.addr = (this.reg.tmp2 + this.reg.Y) & 0xFFFF;
                            if ((this.reg.tmp2 & 0xFF00) != (this.reg.addr & 0xFF00)) {
                                // Page boundary, add a cycle
                                return false;
                            }
                        }
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            aby_w: function() {
                if (this.curCycle < (this.reg.writeonly ? 5 : 7)) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            ind: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp2 = (this.curOp[2] << 8) + this.reg.tmp1;
                        return false;
                    case 3:
                        if (this.reg.tmp3 === null) {
                            this.reg.tmp3 = this.owner.MMU.r(this.reg.tmp2);
                            return false;
                        }
                        if (this.reg.addr === null) {
                            this.reg.addr = (this.owner.MMU.r(this.reg.tmp2 + 1) << 8) + this.reg.tmp3;
                        }
                        return true;
                }
            },
            ind_w: function() {
                // No such thing as a write here
                return true;
            },
            rel: function() {
                if (this.curOp.length == 1) {
                    this.curOp.push(this.owner.MMU.r(this.reg.PC));
                    this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                    this.reg.tmp1 = this.reg.PC;
                    return false;
                }

                this.reg.operand = this.curOp[1];
                this.reg.addr = (this.curOp[1] & 128)
                    ? -(256 - this.curOp[1])
                    : this.curOp[1];
                this.reg.addr += this.reg.tmp1;
                return true;
            },
            rel_w: function() {
                // No such thing as a write here
                return true;
            },
            izx: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        if (this.reg.tmp2 === null) {
                            // Redundant fetch
                            this.reg.tmp2 = this.owner.MMU.r(this.reg.tmp1);
                            this.reg.tmp1 = (this.reg.tmp1 + this.reg.X) & 0xFF;
                            return false;
                        }
                        if (this.reg.tmp3 === null) {
                            this.reg.tmp3 = this.owner.MMU.r(this.reg.tmp1);
                            return false;
                        }
                        if (this.reg.addr === null) {
                            this.reg.addr = (this.owner.MMU.r((this.reg.tmp1 + 1) & 0xFF) << 8) + this.reg.tmp3;
                            return false;
                        }
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            izx_w: function() {
                if (this.curCycle < (this.reg.writeonly ? 6 : 8)) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            },
            izy: function() {
                switch (this.curOp.length) {
                    case 1:
                        this.curOp.push(this.owner.MMU.r(this.reg.PC));
                        this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                        this.reg.tmp1 = this.curOp[1];
                        return false;
                    case 2:
                        if (this.reg.tmp2 === null) {
                            this.reg.tmp2 = this.owner.MMU.r(this.reg.tmp1);
                            return false;
                        }
                        if (this.reg.tmp3 === null) {
                            this.reg.tmp3 = (this.owner.MMU.r((this.reg.tmp1 + 1) & 0xFF) << 8) + this.reg.tmp2;
                            return false;
                        }
                        if (this.reg.addr === null) {
                            this.reg.addr = (this.reg.tmp3 + this.reg.Y) & 0xFFFF;
                            if ((this.reg.tmp3 & 0xFF00) != (this.reg.addr & 0xFF00)) {
                                // Page boundary crossed
                                return false;
                            }
                        }
                        if (this.reg.operand === null) {
                            this.reg.operand = this.owner.MMU.r(this.reg.addr);
                        }
                        return true;
                }
            },
            izy_w: function() {
                if (this.curCycle < (this.reg.writeonly ? 6 : 8)) {
                    return false;
                }
                this.owner.MMU.w(this.reg.addr, this.reg.operand);
                return true;
            }
        },
        disasmHandlers: {
            imp: function(op) {
                return '';
            },
            acc: function(op) {
                return 'a';
            },
            imm: function(op) {
                return '#$' + this.pad(op[1], '0', 2);
            },
            z: function(op) {
                return '$' + this.pad(op[1], '0', 2);
            },
            zx: function(op) {
                return '$' + this.pad(op[1], '0', 2) + ',x';
            },
            zy: function(op) {
                return '$' + this.pad(op[1], '0', 2) + ',y';
            },
            abs: function(op) {
                return '$' + this.pad(op[1] + (op[2] << 8), '000', 4);
            },
            abx: function(op) {
                return '$' + this.pad(op[1] + (op[2] << 8), '000', 4) + ',x';
            },
            aby: function(op) {
                return '$' + this.pad(op[1] + (op[2] << 8), '000', 4) + ',y';
            },
            ind: function(op) {
                return '($' + this.pad(op[1] + (op[2] << 8), '000', 4) + ')';
            },
            rel: function(op) {
                if (this.reg.addr) {
                    return '$' + this.pad(this.reg.addr, '000', 4);
                } else {
                    if (op[1] & 128) {
                        return '-' + (((~op[1]) + 1) & 127);
                    } else {
                        return '+' + op[1];
                    }
                }
            },
            izy: function(op) {
                return '($' + this.pad(op[1], '0', 2) + '),Y';
            },
            izx: function(op) {
                return '($' + this.pad(op[1], '0', 2) + ',X)';
            }
        },
        map: [
            ['BRK','imp',1,7],['ORA','izx',2,6],['HLT','imp',1,2],['SLO','izx',2,8],
            ['NOP','z',  2,3],['ORA','z',  2,3],['ASL','z',  2,5],['SLO','z',  2,5],
            ['PHP','imp',1,3],['ORA','imm',2,2],['ASL','acc',1,2],['ANC','imm',2,2],
            ['NOP','abs',3,4],['ORA','abs',3,4],['ASL','abs',3,6],['SLO','abs',3,6],

            ['BPL','rel',2,2],['ORA','izy',2,5],['HLT','imp',1,2],['SLO','izy',2,8],
            ['NOP','zx', 2,4],['ORA','zx', 2,4],['ASL','zx', 2,6],['SLO','zx', 2,6],
            ['CLC','imp',1,2],['ORA','aby',3,4],['NOP','imp',1,2],['SLO','aby',3,7],
            ['NOP','abx',3,4],['ORA','abx',3,4],['ASL','abx',3,7],['SLO','abx',3,7],

            ['JSR','abs',3,6],['AND','izx',2,6],['HLT','imp',1,2],['RLA','izx',2,8],
            ['BIT','z'  ,2,3],['AND','z'  ,2,3],['ROL','z',  2,5],['RLA','z',  2,5],
            ['PLP','imp',1,4],['AND','imm',2,2],['ROL','acc',1,2],['ANC','imm',2,2],
            ['BIT','abs',3,4],['AND','abs',3,4],['ROL','abs',3,6],['RLA','abs',3,6],

            ['BMI','rel',2,2],['AND','izy',2,5],['HLT','imp',1,2],['RLA','izy',2,8],
            ['NOP','zx', 2,4],['AND','zx', 2,4],['ROL','zx', 2,6],['RLA','zx', 2,6],
            ['SEC','imp',1,2],['AND','aby',3,4],['NOP','imp',1,2],['RLA','aby',3,7],
            ['NOP','abx',3,4],['AND','abx',3,4],['ROL','abx',3,7],['RLA','abx',3,7],

            ['RTI','imp',1,6],['EOR','izx',2,6],['HLT','imp',1,2],['SRE','izx',2,8],
            ['NOP','z',  2,3],['EOR','z',  2,3],['LSR','z',  2,5],['SRE','z',  2,5],
            ['PHA','imp',1,3],['EOR','imm',2,2],['LSR','acc',1,2],['ALR','imm',2,2],
            ['JMP','abs',3,3],['EOR','abs',3,4],['LSR','abs',3,6],['SRE','abs',3,6],

            ['BVC','rel',2,2],['EOR','izy',2,5],['HLT','imp',1,2],['SRE','izy',2,8],
            ['NOP','zx', 2,4],['EOR','zx', 2,4],['LSR','zx', 2,6],['SRE','zx', 2,6],
            ['CLI','imp',1,2],['EOR','aby',3,4],['NOP','imp',1,2],['SRE','aby',3,7],
            ['NOP','abx',3,4],['EOR','abx',3,4],['LSR','abx',3,7],['SRE','abx',3,7],

            ['RTS','imp',1,6],['ADC','izx',2,6],['HLT','imp',1,2],['RRA','izx',2,8],
            ['NOP','z',  2,3],['ADC','z',  2,3],['ROR','z',  2,5],['RRA','z',  2,5],
            ['PLA','imp',1,4],['ADC','imm',2,2],['ROR','acc',1,2],['ARR','imm',2,2],
            ['JMP','ind',3,5],['ADC','abs',3,4],['ROR','abs',3,6],['RRA','abs',3,6],

            ['BVS','rel',2,2],['ADC','izy',2,5],['HLT','imp',1,2],['RRA','izy',2,8],
            ['NOP','zx', 2,4],['ADC','zx', 2,4],['ROR','zx', 2,6],['RRA','zx', 2,6],
            ['SEI','imp',1,2],['ADC','aby',3,4],['NOP','imp',1,2],['RRA','aby',3,7],
            ['NOP','abx',3,4],['ADC','abx',3,4],['ROR','abx',3,7],['RRA','abx',3,7],

            ['NOP','imm',2,2],['STA','izx',2,6],['NOP','imm',2,2],['SAX','izx',2,6],
            ['STY','z',  2,3],['STA','z',  2,3],['STX','z',  2,3],['SAX','z',  2,3],
            ['DEY','imp',1,2],['NOP','imm',2,2],['TXA','imp',1,2],['XAA','imm',2,2],
            ['STY','abs',3,4],['STA','abs',3,4],['STX','abs',3,4],['SAX','abs',3,4],

            ['BCC','rel',2,2],['STA','izy',2,6],['HLT','imp',1,2],['AHX','izy',2,6],
            ['STY','zx', 2,4],['STA','zx', 2,4],['STX','zy', 2,4],['SAX','zy', 2,4],
            ['TYA','imp',1,2],['STA','aby',3,5],['TXS','imp',1,2],['TAS','aby',3,5],
            ['SHY','abx',3,5],['STA','abx',3,5],['SHX','abx',3,5],['AHX','abx',3,5],

            ['LDY','imm',2,2],['LDA','izx',2,6],['LDX','imm',2,2],['LAX','izx',2,6],
            ['LDY','z',  2,3],['LDA','z',  2,3],['LDX','z',  2,3],['LAX','z',  2,3],
            ['TAY','imp',1,2],['LDA','imm',2,2],['TAX','imp',1,2],['LAX','imm',2,2],
            ['LDY','abs',3,4],['LDA','abs',3,4],['LDX','abs',3,4],['LAX','abs',3,4],

            ['BCS','rel',2,2],['LDA','izy',2,5],['HLT','imp',1,2],['LAX','izy',2,5],
            ['LDY','zx', 2,4],['LDA','zx', 2,4],['LDX','zy', 2,4],['LAX','zy', 2,4],
            ['CLV','imp',1,2],['LDA','aby',3,4],['TSX','imp',1,2],['LAS','aby',3,4],
            ['LDY','abx',3,4],['LDA','abx',3,4],['LDX','aby',3,4],['LAX','aby',3,4],

            ['CPY','imm',2,2],['CMP','izx',2,6],['NOP','imm',2,2],['DCP','izx',2,8],
            ['CPY','z',  2,3],['CMP','z',  2,3],['DEC','z',  2,5],['DCP','z',  2,5],
            ['INY','imp',1,2],['CMP','imm',2,2],['DEX','imp',1,2],['AXS','imm',2,2],
            ['CPY','abs',3,4],['CMP','abs',3,4],['DEC','abs',3,6],['DCP','abs',3,6],

            ['BNE','rel',2,2],['CMP','izy',2,5],['HLT','imp',1,2],['DCP','izy',2,8],
            ['NOP','zx', 2,4],['CMP','zx', 2,4],['DEC','zx', 2,6],['DCP','zx', 2,6],
            ['CLD','imp',1,2],['CMP','aby',3,4],['NOP','imp',1,2],['DCP','aby',3,7],
            ['NOP','abx',3,4],['CMP','abx',3,4],['DEC','abx',3,7],['DCP','abx',3,7],

            ['CPX','imm',2,2],['SBC','izx',2,6],['NOP','imm',1,2],['ISC','izx',2,8],
            ['CPX','z',  2,3],['SBC','z',  2,3],['INC','z',  2,5],['ISC','z',  2,5],
            ['INX','imp',1,2],['SBC','imm',2,2],['NOP','imp',1,2],['SBC','imm',2,2],
            ['CPX','abs',3,4],['SBC','abs',3,4],['INC','abs',3,6],['ISC','abs',3,6],

            ['BEQ','rel',2,2],['SBC','izy',2,5],['HLT','imp',1,2],['ISC','izy',2,8],
            ['NOP','zx', 2,4],['SBC','zx', 2,4],['INC','zx', 2,6],['ISC','zx', 2,6],
            ['SED','imp',1,2],['SBC','aby',3,4],['NOP','imp',1,2],['ISC','aby',3,7],
            ['NOP','abx',3,4],['SBC','abx',3,4],['INC','abx',3,7],['ISC','abx',3,7],

            ['INT','imp',1,7],['RST','imp',1,6],['NMI','imp',1,7]
        ],
        flags: {
            N: 128,
            V: 64,
            B: 16,
            D: 8,
            I: 4,
            Z: 2,
            C: 1
        },
        interruptSignals: {
            'INT': 256,
            'RST': 257,
            'NMI': 258
        },
        step: function() {
            this.clock++;

            var op; // [opcode, addr, size, time]
            if (this.halted) {
                return;
            }
            if (this.owner.MMU.busLock) {
                if (this.owner.game.debug) {
                    console.log('BUS LOCK: ' + this.owner.MMU.busLock);
                }
                this.owner.MMU.busLock--;
                return;
            }
            if (this.clock == 1) {
                this.signal('RST');
            }

            this.curCycle++;
            if (this.curOp.length == 0) {
                this.reg.origPC = this.reg.PC;
                if (this.signalled && !(this.reg.P & this.flags.I)) {
                    this.curOp.push(this.signalled);
                    this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                    this.signalled = null;
                } else {
                    this.curOp.push(this.owner.MMU.r(this.reg.PC));
                    this.reg.PC = (this.reg.PC + 1) & 0xFFFF;
                }
            } else {
                op = this.map[this.curOp[0]];
                if (this.addr[op[1]].call(this)) {
                    if (!this.reg.operated) {
                        this.reg.operated = this.ops[op[0]].call(this);
                    }
                    if (this.reg.operated) {
                        if (this.owner.game.debug && !this.reg.printed) {
                            if (this.clock > this.printedTo) {
                                this.reg.printed = true;
                                console.log(this.debugString());
                                this.printedTo = this.clock;
                            }
                        }
                        if (this.reg.writeflag) {
                            if (this.addr[op[1] + '_w'].call(this)) {
                                this.resetOp();
                            }
                        } else {
                            this.resetOp();
                        }
                    }
                }
            }
        },
        disasm: function(pc, len) {
            len = len || 64;
            var i = 0, j, op = [], prevPC;

            do {
                prevPC = pc;
                op.length = 0;
                op.push(this.owner.MMU.r(pc++));

                for (j = 1; j < this.map[op[0]][2]; j++) {
                    op.push(this.owner.MMU.r(pc++));
                }

                i += op.length;
                console.warn([
                    this.pad(prevPC, '000', 4),
                    this.map[op[0]][0],
                    this.disasmHandlers[this.map[op[0]][1]].call(this, op).toUpperCase()
                ].join(' '));
            } while (i < len);
        },
        debugString: function() {
            var i, opcodes = '',
                operand = this.disasmHandlers[this.map[this.curOp[0]][1]].call(this, this.curOp).toUpperCase();

            for (i = 0; i < this.curOp.length; i++) {
                opcodes += this.pad(this.curOp[i], '0', 2, true);
                opcodes += ' ';
            }
            while (opcodes.length < 12) {
                opcodes += ' ';
            }
            while (operand.length < 10) {
                operand += ' ';
            }

            return [
                '.C:' + this.pad(this.reg.origPC, '000', 4),
                ' ' + opcodes,
                this.map[this.curOp[0]][0], operand, '-',
                "A:" + this.pad(this.reg.A, '0', 2, true),
                "X:" + this.pad(this.reg.X, '0', 2, true),
                "Y:" + this.pad(this.reg.Y, '0', 2, true),
                "S:" + this.pad(this.reg.S, '0', 2),
                (
                    ((this.reg.P & this.flags.N) ? 'N' : '.') +
                    ((this.reg.P & this.flags.V) ? 'V' : '.') +
                    '-' +
                    ((this.reg.P & this.flags.B) ? 'B' : '.') +
                    ((this.reg.P & this.flags.D) ? 'D' : '.') +
                    ((this.reg.P & this.flags.I) ? 'I' : '.') +
                    ((this.reg.P & this.flags.Z) ? 'Z' : '.') +
                    ((this.reg.P & this.flags.C) ? 'C' : '.')
                ), ' ',
                this.clock
            ].join(' ');
        },
        pad: function(val, padder, len, upper) {
            return (padder + val.toString(16))[upper ? 'toUpperCase' : 'toLowerCase']().slice(-len);
        },
        signal: function(line) {
            this.signalled = this.interruptSignals[line] || null;
        },
        getState: function() {
            return {
                clock: this.clock,
                curOp: this.curOp.slice(0),
                curCycle: 0 + this.curCycle,
                reg: $.extend({}, this.reg)
            };
        },
        setState: function(state) {
            this.clock = state.clock;
            this.curOp = state.curOp.slice(0);
            this.curCycle = state.curCycle;
            this.reg = $.extend({}, state.reg);
        },
        reset: function() {
            this.reg = {
                PC: 0,
                A: 0,
                X: 0,
                Y: 0,
                S: 0,
                P: 0x20,

                // Might be useful for intermediate addressing steps
                operated: false,
                writeflag: false,
                writeonly: false,
                printed: false,
                operand: null,
                origPC: null,
                addr: null,
                tmp1: null,
                tmp2: null,
                tmp3: null,
                tmp4: null
            };
            this.clock = 0;
            this.printedTo = 0;
            this.halted = false;
            this.resetOp();
        },
        resetOp: function() {
            this.curOp.length = 0;
            this.curCycle = 0;
            this.reg.operated = false;
            this.reg.writeflag = false;
            this.reg.writeonly = false;
            this.reg.printed = false;
            this.reg.operand = null;
            this.reg.origPC = null;
            this.reg.addr = null;
            this.reg.tmp1 = null;
            this.reg.tmp2 = null;
            this.reg.tmp3 = null;
            this.reg.tmp4 = null;
        },
        init: function() {
            this.reset();
        }
    };
});
