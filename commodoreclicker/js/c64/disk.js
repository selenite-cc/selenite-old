define(function() {
    return {
        IEC_ID: 8,
        iec: {
            state: null,
            statetime: null,
            eoi: null,
            prevclk: null,
            prevatn: null,
            data: null,
            bitpos: null,
            dataready: null,
            datalast: null
        },

        listening: false,
        talking: false,
        currCommand: null,
        currChannel: null,
        currFilename: [],
        currFileEntry: null,
        currFilePos: null,

        diskData: null,
        directory: [],
        sectorPositions: [
            0, 21, 42, 63, 84,
            105, 126, 147, 168, 189,
            210, 231, 252, 273, 294,
            315, 336, 357, 376, 395,
            414, 433, 452, 471, 490,
            508, 526, 544, 562, 580,
            598, 615, 632, 649, 666
        ],

        load: function(data) {
            this.diskData = new Uint8Array(data);
            var i, j, pos, track, sector, content, res, file;

            // Ignore the BAM for now, since we can't save

            // Read the directory
            track = 18; sector = 1;
            do {
                res = this.readSector(track, sector, true);
                track = res.nextTrack;
                sector = res.nextSector;
                content = res.content;

                for (i = 0; i < 8; i++) {
                    pos = i * 32;
                    file = {
                        type:        content[pos + 2] & 15,
                        locked:      !!(content[pos + 2] & 64),
                        closed:      !!(content[pos + 2] & 128),
                        startTrack:  content[pos + 3],
                        startSector: content[pos + 4],
                        name:        new Uint8Array(16),
                        sectorCount: content[pos + 30] + (content[pos + 31] * 256)
                    };

                    // We have to assume the size is valid, but it shouldn't
                    // be egregiously oversized
                    file.length = file.sectorCount * 254;
                    if (file.sectorCount < 1024) {
                        file.data = new Uint8Array(file.length);
                    }

                    for (j = 0; j < 16; j++) {
                        if (content[pos + 5 + j] != 0xA0) {
                            file.name[j] = content[pos + 5 + j];
                        }
                    }

                    if (file.startTrack) {
                        this.directory.push(file);
                    }
                }
            } while (track);

            for (i = 0; i < this.directory.length; i++) {
                track = this.directory[i].startTrack;
                sector = this.directory[i].startSector;
                pos = 0;
                do {
                    res = this.readSector(track, sector);
                    track = res.nextTrack;
                    sector = res.nextSector;

                    for (j = 0; j < 254; j++) {
                        this.directory[i].data[pos++] = res.content[j];
                    }
                } while (track);
            }
        },
        readSector: function(track, sector, padTop) {
            var pos = (this.sectorPositions[track - 1] + sector) * 256;
            var i, len, content = [], nextTrack, nextSector;

            nextTrack = this.diskData[pos++];
            nextSector = this.diskData[pos++];
            if (padTop) {
                pos -= 2;
                len = 256;
            } else {
                len = 254;
            }
            for (i = 0; i < len; i++, pos++) {
                content[i] = this.diskData[pos];
            }

            return {
                nextTrack: nextTrack,
                nextSector: nextSector,
                content: content
            };
        },

        command: function() {
            switch (this.iec.data & 0xF0) {
                case 0x20:
                    if ((this.iec.data & 0x0F) == this.IEC_ID) {
                        this.listening = true;
                        this.currCommand = '';
                    }
                    break;
                case 0x30:
                    this.listening = false;
                    this.currCommand = '';
                    break;
                case 0x40:
                    if ((this.iec.data & 0x0F) == this.IEC_ID) {
                        this.talking = true;
                    }
                    break;
                case 0x50:
                    this.talking = false;
                    break;
                case 0x60:
                    // DATA
                    this.currCommand = 'DATA';
                    if (this.talking) {
                        // Sending a file to the computer; which file?
                        if (this.currFilename.length == 1 && this.currFilename[0] == 42) {
                            // *: Load first file
                            this.currFileEntry = 0;
                        } else {
                            this.currFileEntry = -1;
                            for (i = 0; i < this.directory.length; i++) {
                                for (j = 0, m = 0; j < this.currFilename.length; j++) {
                                    if (this.currFilename[j] == this.directory[i].name[j]) {
                                        m++;
                                    }
                                }
                                if (m == this.currFilename.length) {
                                    this.currFileEntry = i;
                                    break;
                                }
                            }

                            // If still -1, the file was not found
                        }
                    }
                    break;
                case 0xE0:
                    // CLOSE
                    this.currCommand = 'CLOSE';
                    break;
                case 0xF0:
                    // OPEN
                    if (this.listening) {
                        this.currCommand = 'OPEN';
                        this.currChannel = this.iec.data & 0x0F;
                        this.currFilename.length = 0;
                        this.currFilePos = 0;
                    }
                    break;
            }
        },
        recv: function() {
            var i, j, m;
            switch (this.currCommand) {
                case 'OPEN':
                    this.currFilename.push(this.iec.data);
                    break;
            }
        },
        send: function() {
            if (this.talking) {
                // Sending file data (if the file exists)
                if (
                  this.currFileEntry !== null && this.currFileEntry != -1 &&
                  this.currFilePos < this.directory[this.currFileEntry].length
                ) {
                    this.iec.dataready = true;
                    this.iec.data = this.directory[this.currFileEntry].data[this.currFilePos++];
                    this.iec.datalast = (this.currFilePos == this.directory[this.currFileEntry].length);
                } else {
                    this.iec.dataready = false;
                }
            }
        },
        getFileProgress: function() {
            if (this.talking) {
                if (
                  this.currFileEntry !== null && this.currFileEntry != -1 &&
                  this.currFilePos < this.directory[this.currFileEntry].length
                ) {
                    return (this.currFilePos * 100) / this.directory[this.currFileEntry].length;
                }
            }

            return 0;
        },
        getState: function() {
            return {
                iec: $.extend({}, this.iec),
                listening: this.listening,
                talking: this.talking,
                currCommand: this.currCommand,
                currChannel: this.currChannel,
                currFilename: this.currFilename.slice(0),
                currFilePos: this.currFilePos
            };
        },
        setState: function(state) {
            this.iec = $.extend({}, state.iec);
            this.listening = state.listening;
            this.talking = state.talking;
            this.currCommand = state.currCommand;
            this.currChannel = state.currChannel;
            this.currFilename = state.currFilename.slice(0);
            this.currFilePos = state.currFilePos;
        },
        step: function() {
            var val, prevState = this.iec.state;
            this.iec.statetime++;

            if (!this.iec.prevatn && this.owner.IEC.check('ATN')) {
                // Hey! Hey disk! Hey disk, hey!
                this.iec.prevatn = true;
                this.iec.state = 16;
                this.iec.statetime = 0;
                return;
            }

            switch (this.iec.state) {
                // Initial state: waiting for talker
                case 0:
                    if (this.iec.prevclk && !this.owner.IEC.check('CLK')) {
                        // Talker has indicated Ready to Send
                        // We should indicate Ready to Listen
                        this.owner.IEC.log(this.IEC_ID, 'received Ready-to-send');
                        this.iec.state = 1;
                    }
                    break;

                // About to indicate ready-to-listen
                case 1:
                    if (this.iec.statetime >= 60) {
                        this.owner.IEC.log(this.IEC_ID, 'indicates Ready-to-listen');
                        this.owner.IEC.release(this.IEC_ID, 'DATA');
                        if (this.owner.IEC.check('DATA')) {
                            // DATA is still pulled after we released it
                            // Talker is indicating it wishes to turnaround
                            this.owner.IEC.log(this.IEC_ID, 'received turnaround');
                            this.iec.state = 6;
                            this.owner.IEC.pulldown(this.IEC_ID, 'CLK');
                        } else {
                            this.iec.state = 2;
                        }
                    }
                    break;

                // Awaiting data and/or EOI
                case 2:
                    if (this.owner.IEC.check('CLK')) {
                        // Talker will proceed to send
                        this.owner.IEC.log(this.IEC_ID, 'awaiting data');
                        this.iec.prevclk = true;
                        this.iec.state = 3;
                        this.iec.data = 0;
                        this.iec.bitpos = 0;
                    } else if (!this.iec.eoi && this.iec.statetime >= 200) {
                        // Over 200us have passed without CLK going high
                        // Talker is indicating End of Indicator
                        this.owner.IEC.log(this.IEC_ID, 'entering EOI');
                        this.owner.IEC.pulldown(this.IEC_ID, 'DATA');
                        this.iec.state = 7;
                    }
                    break;

                // Data reception
                case 3:
                    if (this.iec.prevclk && !this.owner.IEC.check('CLK')) {
                        // CLK rising edge, pull a bit
                        // Note that data levels are reversed
                        val = this.owner.IEC.check('DATA')
                                ? 0
                                : (1 << this.iec.bitpos);
                        this.owner.IEC.log(this.IEC_ID, 'got bit '+val);
                        this.iec.data |= val;
                    } else if (!this.iec.prevclk && this.owner.IEC.check('CLK')) {
                        // CLK falling edge, advance a bit
                        this.iec.bitpos++;
                        this.owner.IEC.log(this.IEC_ID, 'advancing');
                        if (this.iec.bitpos == 8) {
                            // Data is complete
                            this.owner.IEC.log(this.IEC_ID, 'received data '+this.iec.data);
                            this.iec.state = 4;
                        }
                    }
                    this.iec.prevclk = this.owner.IEC.check('CLK');
                    break;

                // End-of-byte ack
                case 4:
                    if (this.iec.statetime >= 60) {
                        // Acknowledge end of data, act thereon
                        this.owner.IEC.pulldown(this.IEC_ID, 'DATA');
                        this.iec.state = 5;

                        if (this.owner.IEC.check('ATN')) {
                            // Command issued
                            this.owner.IEC.log(this.IEC_ID, 'command '+this.iec.data);
                            this.command();
                        } else {
                            this.owner.IEC.log(this.IEC_ID, 'data '+this.iec.data);
                            this.recv();
                        }
                    }
                    break;

                // Post-byte timeout
                case 5:
                    if (this.iec.statetime >= 20) {
                        this.iec.state = 0;
                    }
                    break;

                // Post-turnaround timeout
                case 6:
                    if (this.iec.statetime >= 80) {
                        this.owner.IEC.log(this.IEC_ID, 'turned around');
                        this.owner.IEC.release(this.IEC_ID, 'DATA');
                        this.iec.state = 8;
                    }
                    break;

                // EOI ack
                case 7:
                    if (this.iec.statetime >= 60) {
                        // EOI has been acknowledged for 60us, await data
                        this.owner.IEC.log(this.IEC_ID, 'acknowledged EOI');
                        this.owner.IEC.release(this.IEC_ID, 'DATA');
                        this.iec.state = 2;
                        this.iec.eoi = true;
                    }
                    break;

                case 8:
                    if (this.iec.statetime >= 60) {
                        this.send();
                        if (this.iec.dataready) {
                            // Ready to send, await acknowledgement
                            this.owner.IEC.log(this.IEC_ID, 'ready to send');
                            this.owner.IEC.release(this.IEC_ID, 'CLK');
                            this.iec.state = 9;
                        }
                    }
                    break;
                case 9:
                    this.iec.dataready = false;
                    if (!this.owner.IEC.check('DATA')) {
                        // Ack'd, indicate EOI if necessary
                        if (this.iec.datalast) {
                            // Refuse to start data until EOI ack'd
                            this.owner.IEC.log(this.IEC_ID, 'awaiting EOI ack');
                            this.iec.state = 14;
                            this.iec.bitpos = 0;
                        } else {
                            // Ready to fire
                            if (this.iec.statetime >= 80) {
                                this.owner.IEC.log(this.IEC_ID, 'sending byte '+this.currFilePos + ' of '+this.directory[0].length);
                                this.owner.IEC.pulldown(this.IEC_ID, 'CLK');
                                this.iec.state = 10;
                                this.iec.bitpos = 0;
                            }
                        }
                    }
                    break;
                case 10:
                    // Sending one bit
                    this.iec.datalast = false;
                    if (this.iec.statetime >= 60) {
                        val = (this.iec.data & (1 << this.iec.bitpos));
                        this.owner.IEC.log(this.IEC_ID, 'sending '+val+' at bit '+this.iec.bitpos);
                        this.owner.IEC[val ? 'release' : 'pulldown'](this.IEC_ID, 'DATA');
                        this.iec.state = 11;
                        this.iec.bitpos++;
                    }
                    break;
                case 11:
                    // Bit ready for latching
                    if (this.iec.statetime >= 60) {
                        this.owner.IEC.release(this.IEC_ID, 'CLK');
                        this.iec.state = 12;
                    }
                    break;
                case 12:
                    // Signalling end of bit
                    if (this.iec.statetime >= 60) {
                        this.owner.IEC.pulldown(this.IEC_ID, 'CLK');
                        this.owner.IEC.release(this.IEC_ID, 'DATA');
                        this.iec.state = (this.iec.bitpos < 8) ? 10 : 13;
                    }
                    break;
                case 13:
                    if (this.iec.statetime >= 20) {
                        if (this.owner.IEC.check('DATA')) {
                            this.owner.IEC.log(this.IEC_ID, 'byte acknowledged');
                            this.iec.state = 8;
                            if (this.currFilePos == this.directory[0].length) {
                                // Turnaround back to listening
                                this.owner.IEC.log(this.IEC_ID, 'turning back around');
                                this.owner.IEC.release(this.IEC_ID, 'CLK');
                                this.owner.IEC.pulldown(this.IEC_ID, 'DATA');
                                this.iec.state = 0;
                            }
                        }
                    }
                    break;
                case 14:
                    // EOI handshake, step 1: data high
                    if (this.owner.IEC.check('DATA')) {
                        this.iec.state = 15;
                    }
                    break;
                case 15:
                    // EOI handshake, step 2: data low again
                    if (!this.owner.IEC.check('DATA')) {
                        this.owner.IEC.pulldown(this.IEC_ID, 'CLK');
                        this.iec.state = 10;
                        this.iec.bitpos = 0;
                    }
                    break;

                // ATN pulled down by the computer
                case 16:
                    if (this.iec.statetime >= 60) {
                        this.atnReset();
                    }
                    break;
            }

            if (this.iec.state != prevState) {
                this.iec.statetime = 0;
            }
            this.iec.prevatn = this.owner.IEC.check('ATN');
            this.iec.prevclk = this.owner.IEC.check('CLK');
        },
        atnReset: function() {
            this.owner.IEC.register(this.IEC_ID);
            this.owner.IEC.pulldown(this.IEC_ID, 'DATA');
            this.iec.state = 0;
            this.iec.statetime = 0;
            this.iec.eoi = false;
            this.iec.data = 0;
            this.iec.bitpos = 0;
            this.iec.dataready = false;
            this.iec.datalast = false;
        },
        reset: function() {
            this.atnReset();
            this.iec.prevclk = true;
            this.listening = false;
            this.talking = false;
            this.currCommand = null;
            this.currChannel = null;
            this.currFilename.length = 0;
            //this.directory.length = 0;
        },
        init: function() {
        }
    };
});
