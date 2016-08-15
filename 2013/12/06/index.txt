title: Fikse `mkfs.ntfs` på Ubuntu
date: 2013-12-06
---

I Ubuntu 13.04 er `mkfs.ntfs` utilgjengelig (`mkntfs` fungerer). Dette skyldes en [manglende symlink](https://bugs.launchpad.net/ubuntu/+source/ntfs-3g/+bug/1148541) fra `/sbin/mkfs.ntfs` til `/sbin/mkntfs`. Det følgende retter opp problemet:

    $ sudo unlink /sbin/mkfs.ntfs
    $ sudo ln -s /sbin/mkntfs /sbin/mkfs.ntfs
