define(function() {
    return {
        busLock: null,
        vicBank: null,
        CHAREN: null,
        HIRAM: null,
        LORAM: null,

        ram: null,
        romBasic: null,
        romKernal: null,
        charRom: null,

        r: function(addr) {
            switch (addr & 0xF000) {
                case 0x0000:
                case 0x1000:
                case 0x2000:
                case 0x3000:
                case 0x4000:
                case 0x5000:
                case 0x6000:
                case 0x7000:
                case 0x8000:
                case 0x9000:
                    return this.ram[addr];
                case 0xA000:
                case 0xB000:
                    return (this.LORAM && this.HIRAM)
                        ? this.romBasic[addr & 0x1FFF]
                        : this.ram[addr];
                case 0xC000:
                    return this.ram[addr];
                case 0xD000:
                    return (this.LORAM || this.HIRAM)
                        ? (this.CHAREN
                            ? this.io_r(addr & 0x0FFF)
                            : this.charRom[addr & 0x0FFF])
                        : this.ram[addr];
                case 0xE000:
                case 0xF000:
                    return this.HIRAM
                        ? this.romKernal[addr & 0x1FFF]
                        : this.ram[addr];
            }
        },
        w: function(addr, val) {
            if (addr == 0x0001) {
                this.CHAREN = !!(val & 4);
                this.HIRAM  = !!(val & 2);
                this.LORAM  = !!(val & 1);
            } else if ((addr & 0xF000) == 0xD000 && this.CHAREN) {
                this.io_w(addr & 0x0FFF, val);
            }
            this.ram[addr] = val;
        },
        io_r: function(addr) {
            switch (addr & 0xF00) {
                case 0x000:
                case 0x100:
                case 0x200:
                case 0x300:
                    return this.owner.VIC.io_r(addr);
                case 0x800:
                case 0x900:
                case 0xA00:
                case 0xB00:
                    return this.owner.VIC.colorRam[addr & 0x03FF];
                case 0xC00:
                case 0xD00:
                    return this.owner.CIA.io_r(addr);
                case 0xE00:
                    if ((addr & 0x00FF) == 0) {
                        return (
                            (this.owner.game.effects.rasterbars   ? 1 : 0) +
                            (this.owner.game.effects.scrollshake  ? 2 : 0) +
                            (this.owner.game.effects.sprite       ? 4 : 0) +
                            (this.owner.game.effects.doublesprite ? 8 : 0)
                        );
                    }
                    break;
            }
            return 0;
        },
        io_w: function(addr, val) {
            switch (addr & 0xF00) {
                case 0x000:
                case 0x100:
                case 0x200:
                case 0x300:
                    this.owner.VIC.io_w(addr, val);
                    break;
                case 0x800:
                case 0x900:
                case 0xA00:
                case 0xB00:
                    if ((addr & 0x03FF) >= 1000) {
                        return;
                    }
                    this.owner.VIC.colorRam[addr & 0x03FF] = val & 15;
                    break;
                case 0xC00:
                case 0xD00:
                    this.owner.CIA.io_w(addr, val);
                    break;
            }
        },
        getState: function() {
            return {
                ram: new Uint8Array(this.ram),
                busLock: this.busLock + 0
            };
        },
        setState: function(state) {
            this.ram = new Uint8Array(state.ram);
            this.busLock = 0 + state.busLock;
        },
        reset: function() {
            this.busLock = 0;
            this.vicBank = 0;
            this.CHAREN = true;
            this.HIRAM = true;
            this.LORAM = true;
        },
        init: function() {
            var i, j;

            this.ram = new Uint8Array(65536);
            this.romBasic = new Uint8Array(8192);
            this.romKernal = new Uint8Array(8192);
            this.charRom = new Uint8Array(4096);

            this.reset();
            for (i = 0, j = this.charRomSrc.match(/.{2}/g); i < 4096; i++) {
                this.charRom[i] = parseInt(j[i], 16);
            }
        },
        charRomSrc: [
            '3c666e6e60623c00183c667e666666007c66667c66667c003c66606060663c00',
            '786c6666666c78007e60607860607e007e606078606060003c66606e66663c00',
            '6666667e666666003c18181818183c001e0c0c0c0c6c3800666c7870786c6600',
            '6060606060607e0063777f6b6363630066767e7e6e6666003c66666666663c00',
            '7c66667c606060003c666666663c0e007c66667c786c66003c66603c06663c00',
            '7e181818181818006666666666663c0066666666663c18006363636b7f776300',
            '66663c183c6666006666663c181818007e060c1830607e003c30303030303c00',
            '0c12307c3062fc003c0c0c0c0c0c3c0000183c7e181818180010307f7f301000',
            '0000000000000000181818180000180066666600000000006666ff66ff666600',
            '183e603c067c180062660c18306646003c663c3867663f00060c180000000000',
            '0c18303030180c0030180c0c0c18300000663cff3c6600000018187e18180000',
            '00000000001818300000007e0000000000000000001818000003060c18306000',
            '3c666e7666663c001818381818187e003c66060c30607e003c66061c06663c00',
            '060e1e667f0606007e607c0606663c003c66607c66663c007e660c1818181800',
            '3c66663c66663c003c66663e06663c0000001800001800000000180000181830',
            '0e18306030180e0000007e007e00000070180c060c1870003c66060c18001800',
            '000000ffff000000081c3e7f7f1c3e001818181818181818000000ffff000000',
            '0000ffff0000000000ffff000000000000000000ffff00003030303030303030',
            '0c0c0c0c0c0c0c0c000000e0f038181818181c0f07000000181838f0e0000000',
            'c0c0c0c0c0c0ffffc0e070381c0e070303070e1c3870e0c0ffffc0c0c0c0c0c0',
            'ffff030303030303003c7e7e7e7e3c000000000000ffff00367f7f7f3e1c0800',
            '6060606060606060000000070f1c1818c3e77e3c3c7ee7c3003c7e66667e3c00',
            '1818666618183c000606060606060606081c3e7f3e1c0800181818ffff181818',
            'c0c03030c0c0303018181818181818180000033e76363600ff7f3f1f0f070301',
            '0000000000000000f0f0f0f0f0f0f0f000000000ffffffffff00000000000000',
            '00000000000000ffc0c0c0c0c0c0c0c0cccc3333cccc33330303030303030303',
            '00000000cccc3333fffefcf8f0e0c08003030303030303031818181f1f181818',
            '000000000f0f0f0f1818181f1f000000000000f8f8181818000000000000ffff',
            '0000001f1f181818181818ffff000000000000ffff181818181818f8f8181818',
            'c0c0c0c0c0c0c0c0e0e0e0e0e0e0e0e00707070707070707ffff000000000000',
            'ffffff00000000000000000000ffffff030303030303ffff00000000f0f0f0f0',
            '0f0f0f0f00000000181818f8f8000000f0f0f0f000000000f0f0f0f00f0f0f0f',
            'c39991919f99c3ffe7c39981999999ff83999983999983ffc3999f9f9f99c3ff',
            '87939999999387ff819f9f879f9f81ff819f9f879f9f9fffc3999f919999c3ff',
            '99999981999999ffc3e7e7e7e7e7c3ffe1f3f3f3f393c7ff9993878f879399ff',
            '9f9f9f9f9f9f81ff9c8880949c9c9cff99898181919999ffc39999999999c3ff',
            '839999839f9f9fffc399999999c3f1ff83999983879399ffc3999fc3f999c3ff',
            '81e7e7e7e7e7e7ff999999999999c3ff9999999999c3e7ff9c9c9c9480889cff',
            '9999c3e7c39999ff999999c3e7e7e7ff81f9f3e7cf9f81ffc3cfcfcfcfcfc3ff',
            'f3edcf83cf9d03ffc3f3f3f3f3f3c3ffffe7c381e7e7e7e7ffefcf8080cfefff',
            'ffffffffffffffffe7e7e7e7ffffe7ff999999ffffffffff99990099009999ff',
            'e7c19fc3f983e7ff9d99f3e7cf99b9ffc399c3c79899c0fff9f3e7ffffffffff',
            'f3e7cfcfcfe7f3ffcfe7f3f3f3e7cfffff99c300c399ffffffe7e781e7e7ffff',
            'ffffffffffe7e7cfffffff81ffffffffffffffffffe7e7fffffcf9f3e7cf9fff',
            'c39991899999c3ffe7e7c7e7e7e781ffc399f9f3cf9f81ffc399f9e3f999c3ff',
            'f9f1e19980f9f9ff819f83f9f999c3ffc3999f839999c3ff8199f3e7e7e7e7ff',
            'c39999c39999c3ffc39999c1f999c3ffffffe7ffffe7ffffffffe7ffffe7e7cf',
            'f1e7cf9fcfe7f1ffffff81ff81ffffff8fe7f3f9f3e78fffc399f9f3e7ffe7ff',
            'ffffff0000fffffff7e3c18080e3c1ffe7e7e7e7e7e7e7e7ffffff0000ffffff',
            'ffff0000ffffffffff0000ffffffffffffffffff0000ffffcfcfcfcfcfcfcfcf',
            'f3f3f3f3f3f3f3f3ffffff1f0fc7e7e7e7e7e3f0f8ffffffe7e7c70f1fffffff',
            '3f3f3f3f3f3f00003f1f8fc7e3f1f8fcfcf8f1e3c78f1f3f00003f3f3f3f3f3f',
            '0000fcfcfcfcfcfcffc381818181c3ffffffffffff0000ffc9808080c1e3f7ff',
            '9f9f9f9f9f9f9f9ffffffff8f0e3e7e73c1881c3c381183cffc381999981c3ff',
            'e7e79999e7e7c3fff9f9f9f9f9f9f9f9f7e3c180c1e3f7ffe7e7e70000e7e7e7',
            '3f3fcfcf3f3fcfcfe7e7e7e7e7e7e7e7fffffcc189c9c9ff0080c0e0f0f8fcfe',
            'ffffffffffffffff0f0f0f0f0f0f0f0fffffffff0000000000ffffffffffffff',
            'ffffffffffffff003f3f3f3f3f3f3f3f3333cccc3333ccccfcfcfcfcfcfcfcfc',
            'ffffffff3333cccc000103070f1f3f7ffcfcfcfcfcfcfcfce7e7e7e0e0e7e7e7',
            'fffffffff0f0f0f0e7e7e7e0e0ffffffffffff0707e7e7e7ffffffffffff0000',
            'ffffffe0e0e7e7e7e7e7e70000ffffffffffff0000e7e7e7e7e7e70707e7e7e7',
            '3f3f3f3f3f3f3f3f1f1f1f1f1f1f1f1ff8f8f8f8f8f8f8f80000ffffffffffff',
            '000000ffffffffffffffffffff000000fcfcfcfcfcfc0000ffffffff0f0f0f0f',
            'f0f0f0f0ffffffffe7e7e70707ffffff0f0f0f0fffffffff0f0f0f0ff0f0f0f0',
            '3c666e6e60623c0000003c063e663e000060607c66667c0000003c6060603c00',
            '0006063e66663e0000003c667e603c00000e183e1818180000003e66663e067c',
            '0060607c666666000018003818183c00000600060606063c0060606c786c6600',
            '0038181818183c000000667f7f6b630000007c666666660000003c6666663c00',
            '00007c66667c606000003e66663e060600007c666060600000003e603c067c00',
            '00187e1818180e000000666666663e0000006666663c18000000636b7f3e3600',
            '0000663c183c660000006666663e0c7800007e0c18307e003c30303030303c00',
            '0c12307c3062fc003c0c0c0c0c0c3c0000183c7e181818180010307f7f301000',
            '0000000000000000181818180000180066666600000000006666ff66ff666600',
            '183e603c067c180062660c18306646003c663c3867663f00060c180000000000',
            '0c18303030180c0030180c0c0c18300000663cff3c6600000018187e18180000',
            '00000000001818300000007e0000000000000000001818000003060c18306000',
            '3c666e7666663c001818381818187e003c66060c30607e003c66061c06663c00',
            '060e1e667f0606007e607c0606663c003c66607c66663c007e660c1818181800',
            '3c66663c66663c003c66663e06663c0000001800001800000000180000181830',
            '0e18306030180e0000007e007e00000070180c060c1870003c66060c18001800',
            '000000ffff000000183c667e666666007c66667c66667c003c66606060663c00',
            '786c6666666c78007e60607860607e007e606078606060003c66606e66663c00',
            '6666667e666666003c18181818183c001e0c0c0c0c6c3800666c7870786c6600',
            '6060606060607e0063777f6b6363630066767e7e6e6666003c66666666663c00',
            '7c66667c606060003c666666663c0e007c66667c786c66003c66603c06663c00',
            '7e181818181818006666666666663c0066666666663c18006363636b7f776300',
            '66663c183c6666006666663c181818007e060c1830607e00181818ffff181818',
            'c0c03030c0c0303018181818181818183333cccc3333cccc3399cc663399cc66',
            '0000000000000000f0f0f0f0f0f0f0f000000000ffffffffff00000000000000',
            '00000000000000ffc0c0c0c0c0c0c0c0cccc3333cccc33330303030303030303',
            '00000000cccc3333cc993366cc99336603030303030303031818181f1f181818',
            '000000000f0f0f0f1818181f1f000000000000f8f8181818000000000000ffff',
            '0000001f1f181818181818ffff000000000000ffff181818181818f8f8181818',
            'c0c0c0c0c0c0c0c0e0e0e0e0e0e0e0e00707070707070707ffff000000000000',
            'ffffff00000000000000000000ffffff0103066c7870600000000000f0f0f0f0',
            '0f0f0f0f00000000181818f8f8000000f0f0f0f000000000f0f0f0f00f0f0f0f',
            'c39991919f99c3ffffffc3f9c199c1ffff9f9f83999983ffffffc39f9f9fc3ff',
            'fff9f9c19999c1ffffffc399819fc3fffff1e7c1e7e7e7ffffffc19999c1f983',
            'ff9f9f83999999ffffe7ffc7e7e7c3fffff9fff9f9f9f9c3ff9f9f93879399ff',
            'ffc7e7e7e7e7c3ffffff998080949cffffff8399999999ffffffc3999999c3ff',
            'ffff839999839f9fffffc19999c1f9f9ffff83999f9f9fffffffc19fc3f983ff',
            'ffe781e7e7e7f1ffffff99999999c1ffffff999999c3e7ffffff9c9480c1c9ff',
            'ffff99c3e7c399ffffff999999c1f387ffff81f3e7cf81ffc3cfcfcfcfcfc3ff',
            'f3edcf83cf9d03ffc3f3f3f3f3f3c3ffffe7c381e7e7e7e7ffefcf8080cfefff',
            'ffffffffffffffffe7e7e7e7ffffe7ff999999ffffffffff99990099009999ff',
            'e7c19fc3f983e7ff9d99f3e7cf99b9ffc399c3c79899c0fff9f3e7ffffffffff',
            'f3e7cfcfcfe7f3ffcfe7f3f3f3e7cfffff99c300c399ffffffe7e781e7e7ffff',
            'ffffffffffe7e7cfffffff81ffffffffffffffffffe7e7fffffcf9f3e7cf9fff',
            'c39991899999c3ffe7e7c7e7e7e781ffc399f9f3cf9f81ffc399f9e3f999c3ff',
            'f9f1e19980f9f9ff819f83f9f999c3ffc3999f839999c3ff8199f3e7e7e7e7ff',
            'c39999c39999c3ffc39999c1f999c3ffffffe7ffffe7ffffffffe7ffffe7e7cf',
            'f1e7cf9fcfe7f1ffffff81ff81ffffff8fe7f3f9f3e78fffc399f9f3e7ffe7ff',
            'ffffff0000ffffffe7c39981999999ff83999983999983ffc3999f9f9f99c3ff',
            '87939999999387ff819f9f879f9f81ff819f9f879f9f9fffc3999f919999c3ff',
            '99999981999999ffc3e7e7e7e7e7c3ffe1f3f3f3f393c7ff9993878f879399ff',
            '9f9f9f9f9f9f81ff9c8880949c9c9cff99898181919999ffc39999999999c3ff',
            '839999839f9f9fffc399999999c3f1ff83999983879399ffc3999fc3f999c3ff',
            '81e7e7e7e7e7e7ff999999999999c3ff9999999999c3e7ff9c9c9c9480889cff',
            '9999c3e7c39999ff999999c3e7e7e7ff81f9f3e7cf9f81ffe7e7e70000e7e7e7',
            '3f3fcfcf3f3fcfcfe7e7e7e7e7e7e7e7cccc3333cccc3333cc663399cc663399',
            'ffffffffffffffff0f0f0f0f0f0f0f0fffffffff0000000000ffffffffffffff',
            'ffffffffffffff003f3f3f3f3f3f3f3f3333cccc3333ccccfcfcfcfcfcfcfcfc',
            'ffffffff3333cccc3366cc993366cc99fcfcfcfcfcfcfcfce7e7e7e0e0e7e7e7',
            'fffffffff0f0f0f0e7e7e7e0e0ffffffffffff0707e7e7e7ffffffffffff0000',
            'ffffffe0e0e7e7e7e7e7e70000ffffffffffff0000e7e7e7e7e7e70707e7e7e7',
            '3f3f3f3f3f3f3f3f1f1f1f1f1f1f1f1ff8f8f8f8f8f8f8f80000ffffffffffff',
            '000000ffffffffffffffffffff000000fefcf993878f9fffffffffff0f0f0f0f',
            'f0f0f0f0ffffffffe7e7e70707ffffff0f0f0f0fffffffff0f0f0f0ff0f0f0f0'
        ].join('')
    };
});
