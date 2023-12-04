Commodore Clicker
=================

A JavaScript incremental game which drives the clock of a Commodore 64 emulation. Or at least, that's the eventual goal.
[Play the game here.](http://c64clicker.com/)

Usage
-----

The emulated C64 boots into the incremental game, but this can be interrupted in the usual manner of hitting Run/Stop + Restore. After interruption, the game can be restarted using the statement: SYS 49152

A joystick is plugged into port 2 of the C64, and its directions are mapped to the arrow keys. The joystick is used in-game to allow movement of the sprite. Alt is the Fire key, but this is not used in-game at this time.

The keyboard corresponds to that of a British C64, and is mapped in similar fashion to VICE's mapping. The following keys are non-obvious mappings:

* F1, F2, F3, F4 are mapped to the C64's F1, F3, F5, F7. Shift-F1 is the C64's F2, and so on.
* Escape is Run/Stop; F8 is Restore.
* Tab is the C64's Control; the host's Control maps to the Commodore key.

Key map entries not mentioned here are documented in the CIA emulation.

Credits
-------

Libraries included:

* [BigInteger, by Matthew Crumley and John Tobey](http://silentmatt.com/biginteger/)
* [jQuery.PowerTip, by Steven Benner](http://stevenbenner.github.com/jquery-powertip/)
* [Require.js, by the Dojo Foundation](http://github.com/jrburke/requirejs)
* [jQuery-Ajax-Blob-ArrayBuffer, by Christopher Keefer](https://gist.github.com/SaneMethod/7548768)
* [JSZip, by Stuart Knightley](https://github.com/Stuk/jszip)
* And, of course, jQuery.

Test ROMs included:

* [Klaus Dormann's 6502 functional tests](https://github.com/redline6561/cl-6502/blob/b0087903/tests/6502_functional_test.a65)

Resources that have been infinitely useful:

* [The C64 memory map](http://sta.c64.org/cbm64mem.html)
* [The VIC-II For Beginners series, by actraiser, 2013](http://dustlayer.com/vic-ii/2013/4/22/when-visibility-matters)
* ["The MOS 6567/6569 video controller and its application in the Commodore 64", by Christian Bauer, 1996](http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt)
* ["Documentation for the NMOS 65xx instruction set", by John West and Marko Makela, 1994](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/64doc)
* [6502 opcode matrix, by Graham/Oxyron, 2012](http://www.oxyron.de/html/opcodes02.html)
* [Opcode pseudocode from VICE, compiled at Nesdev](http://nesdev.com/6502.txt)
* ["Internals of BRK/IRQ/NMI/RESET on a MOS 6502", by Michael Steil, 2010](http://www.pagetable.com/?p=410)
* [CIA register map, on the C64 Wiki](http://www.c64-wiki.com/index.php/CIA)
* [Kernal/BASIC disassembly, by Marko Makela, 1994](http://www.ffd2.com/fridge/docs/c64-diss.html)
* ["How the VIC/64 Serial Bus Works", by Jim Butterfield, 1983](ftp://ftp.zimmers.net/pub/cbm/programming/serial-bus.pdf)
