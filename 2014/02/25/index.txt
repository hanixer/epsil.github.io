title: Kjøre foobar2000 under OS X
date: 2014-02-25
---

1.  Installer Wine med `$ brew install wine` (det kan bli nødvendig å installere XQuartz o.a. avhengigheter først). Symlink `/opt/local/bin/wine` til `/usr/local/bin/wine` (`$ sudo ln -s /usr/local/bin/wine /opt/local/bin/wine`).
2.  Installer foobar2000 til `~/.wine/drive_c/Program Files/foobar2000` (portabel installasjon).
3.  Installer [Foobar2000mac](https://github.com/xeoron/foobar2000-mac) for å få en snarvei til foobar2000.
4.  For MP3-komprimering: `lame.exe` legges i `foobar2000`-mappen. (På OS X er [X Lossless Decoder](http://tmkk.undo.jp/xld/index_e.html) et alternativ for FLAC-transkoding.)

Tahoma-fonten kan installeres med `$ winetricks fonts tahoma` (forutsetter `$ brew install winetricks` og ev. `$ brew install zenity`), men dette ser dessverre ikke ut til å ha noen effekt under OS X (jf. [2012-05-03](../../../2012/05/03)).
