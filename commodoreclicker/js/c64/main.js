define([
    'c64/vic',
    'c64/mmu',
    'c64/cpu',
    'c64/iec',
    'c64/cia',
    'c64/disk',
    'thirdparty/jquery-ajax-blob-arraybuffer',
    'thirdparty/jszip/dist/jszip.min'
], function(VIC, MMU, CPU, IEC, CIA, DISK, blob, JSZip) {
    var C64 = {
        MMU: MMU,
        CPU: CPU,
        IEC: IEC,
        CIA: CIA,
        DISK: DISK,
        VIC: VIC
    };
    for (var i in C64) {
        if (C64.hasOwnProperty(i)) {
            C64[i].owner = C64;
            C64[i].init.call(C64[i]);
        }
    }
    C64.reset = function() {
        C64.MMU.reset();
        C64.CPU.reset();
        C64.IEC.reset();
        C64.CIA.reset();
        C64.DISK.reset();
        C64.VIC.reset();
        C64.saveFrame(0, 1);
    };

    C64.savedFrames = {};
    C64.saveFrame = function(frame, numFrames) {
        if (C64.savedFrames[frame]) {
            return;
        }
        if (numFrames > 2) {
            numFrames = 2;
        }
        C64.savedFrames[frame] = {
            MMU: C64.MMU.getState(),
            CPU: C64.CPU.getState(),
            IEC: C64.IEC.getState(),
            CIA: C64.CIA.getState(),
            DISK: C64.DISK.getState(),
            VIC: C64.VIC.getState()
        };
        for (i in C64.savedFrames) {
            if (i > 0 && i < (frame - numFrames)) {
                delete C64.savedFrames[i];
            }
        }
    };
    C64.restoreFrame = function(frame) {
        if (!C64.savedFrames[frame]) {
            frame = 0;
        }
        for (i in C64.savedFrames[frame]) {
            C64[i].setState(C64.savedFrames[frame][i]);
        }
    };
    C64.dropFrame = function(frame) {
        if (C64.savedFrames[frame]) {
            delete C64.savedFrames[frame];
        }
    };

    C64.loadPrg = function(prg) {
        var promise = $.Deferred();

        $.ajax({
            url: prg,
            dataType: 'arraybuffer',
            beforeSend: function(xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        }).done(function(data) {
            var content = new Uint8Array(data);
            var pc = content[0] + (content[1] * 256);
            for (var i = 2; i < content.length; i++) {
                this.MMU.ram[pc+i] = content[i];
            }
            this.CPU.reg.PC = pc;
            promise.resolve();
        }.bind(this));

        return promise;
    };

    C64.loadDisk = function(d64) {
        var promise = $.Deferred();

        $.ajax({
            url: d64,
            dataType: 'arraybuffer',
            beforeSend: function(xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        }).done(function(data) {
            this.dropFrame(0);
            this.CPU.reset();
            this.MMU.reset();
            this.IEC.reset();
            this.CIA.reset();
            this.DISK.reset();
            this.VIC.reset();

            this.VIC.renderPixels(this.VIC.sizes.FRAME_SIZE * 10);

            for (var i = 0; i < 65536; i++) {
                this.MMU.ram[i] = DISK.loadDump[i];
            }
            this.CPU.reg.A  = 0x00;
            this.CPU.reg.X  = 0x0C;
            this.CPU.reg.Y  = 0x26;
            this.CPU.reg.PC = 0xE168;
            this.CPU.reg.S  = 0xE9;

            this.DISK.load(data);
            this.saveFrame(0, 1);
            promise.resolve();
        }.bind(this));

        return promise;
    };

    C64.loadGame = function() {
        var promise = $.Deferred();

        $.ajax({
            url: '/rom/game.zip',
            dataType: 'arraybuffer',
            beforeSend: function(xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        }).done(function(data) {
            this.dropFrame(0);
            this.CPU.reset();
            this.MMU.reset();

            var i, zip = new JSZip();
            zip.load(data);

            var kernal = zip.file('kernal.rom').asUint8Array(),
                basic = zip.file('basic.rom').asUint8Array(),
                game = zip.file('game.bin').asUint8Array(),
                loadDump = zip.file('loadram.bin').asUint8Array();

            for (var i = 0; i < kernal.length; i++) {
                this.MMU.romKernal[i] = kernal[i];
            }
            for (var i = 0; i < basic.length; i++) {
                this.MMU.romBasic[i] = basic[i];
            }
            for (var i = 0; i < game.length; i++) {
                this.MMU.ram[0xC000 + i] = game[i];
            }

            DISK.loadDump = new Uint8Array(loadDump);

            this.IEC.reset();
            this.CIA.reset();
            this.DISK.reset();
            this.VIC.reset();

            this.VIC.renderPixels(this.VIC.sizes.FRAME_SIZE * 10);
            this.CPU.reg.PC = 0xC000;

            this.VIC.backContext.fillStyle = 'black';
            this.VIC.backContext.fillRect(0, 0, this.VIC.sizes.RASTER_LENGTH, this.VIC.sizes.RASTER_COUNT);
            this.saveFrame(0, 1);
            promise.resolve();
        }.bind(this));

        return promise;
    };

    return C64;
});
