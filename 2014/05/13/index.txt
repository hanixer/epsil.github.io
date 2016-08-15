title: Hvordan [skrive til en NTFS-disk på OS X](http://osxdaily.com/2013/10/02/enable-ntfs-write-support-mac-os-x/)
date: 2014-05-13
---

Rediger filen `/etc/fstab`:

    $ sudo vi /etc/fstab

Legg til:

    LABEL=DRIVE_NAME none ntfs rw,auto,nobrowse

(Hvis disken har et komplisert navn, finn UUID-en med `$ diskutil info /Volumes/DRIVENAME | grep UUID` og skriv `UUID=...` istedenfor.)

Disken vil ikke vises som en vanlig disk, men kan åpnes i Finder med:

    $ open /Volumes/DRIVENAME

Alternativt kan man legge til en snarvei på skrivebordet:

    $ sudo ln -s /Volumes/DRIVENAME ~/Desktop/DRIVENAME

* * * * *

**Oppdatering:** På OS X Yosemite fungerer ikke dette lenger. ~~Bruk istedenfor [NTFS-3G](http://www.macbreaker.com/2014/06/how-to-enable-writing-to-ntfs-hard.html).~~
