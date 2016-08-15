title: Migrering av data til Advanced Format-harddisk
date: 2011-09-14
---

Dvs. Western Digital Scorpio Black.

1.  Registrer harddisken og last ned Acronis WD Align.
2.  [Klon den gamle harddisken med `dd` + NetCat](../../../2010/11/27/): `$ nc -l -p 8888 | dd of=/dev/sda` (til), `$ dd if=/dev/sda | nc 192.168.1.x 8888` (fra).
3.  Reinstaller Ubuntu og bruk FAT32 for Linux-partisjoner.
4.  Kjør Align-verktøyet fra oppstarts-CD (eller i Windows?).
5.  Reinstaller Ubuntu og bruk Ext4 for Linux-partisjoner.
6.  Kopier `/home` over SSH eller Samba.
7.  [Installer GNOME](../../05/29/).
