define(function() {
    return {
        lines: {},
        devices: [],

        register: function(device) {
            if (!this.lines[device]) {
                this.devices.push(device);
            }
            this.lines[device] = {
                ATN: false,
                CLK: false,
                DATA: false
            };
        },
        log: function(device, str) {
            if (this.owner.game.debug) {
                console.log('[IEC] {'+this.owner.CPU.clock+'} Device '+device+' '+str);
            }
        },
        pulldown: function(device, line) {
            if (!this.lines[device][line]) {
                this.log(device, 'pulling down '+line);
            }
            this.lines[device][line] = true;
        },
        release: function(device, line) {
            if (this.lines[device][line]) {
                this.log(device, 'releasing '+line);
            }
            this.lines[device][line] = false;
        },
        check: function(line) {
            for (var i = 0; i < this.devices.length; i++) {
                if (this.lines[this.devices[i]][line]) {
                    return true;
                }
            }
            return false;
        },
        getState: function() {
            return $.extend({}, this.lines);
        },
        setState: function(state) {
            this.lines = $.extend({}, state);
        },
        signal: function(line) {
            if (line == 'RESET') {
                this.owner.DISK.reset();
            }
        },
        reset: function() {
            var i;
            this.lines = {};
            for (i in this.devices) {
                this.register(this.devices[i]);
            }
        },
        init: function() {
            this.lines = {};
        }
    };
});
