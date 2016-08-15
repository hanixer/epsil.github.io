title: Installere GNOME 3 på Ubuntu
date: 2011-05-29
---

1.  Flytt innstillingsfiler: `$ mv .[^.]* oldsettings`.
2.  Installer Ubuntu 11.04 til `/dev/sda5` med `/home` på `/dev/sda7`.
3.  Slå av lyd og oppdater språkpakker, samt slå av skjermlås.
4.  Legg til bruker i gruppen `nopasswdlogin` (`$ sudo adduser user nopasswdlogin`).
5.  Kjør `$ sudo apt-get dist-upgrade`.
6.  Avinstaller pakkene `overlay-scrollbar` og `liboverlay-scrollbar-0.1-0` og start på nytt.
7.  Legg til GNOME 3-repoet med `$ sudo add-apt-repository ppa:gnome3-team/gnome3` og kjør `$ sudo apt-get update` for å oppdatere pakkelistene.
8.  Kjør `$ sudo apt-get dist-upgrade`.
9.  Installer GNOME Shell med `$ sudo apt-get install gnome-shell`, `$ sudo apt-get install gnome-session`, `$ sudo apt-get install gnome-themes-standard`, `$ sudo apt-get install gnome-tweak-tool`.
10. Start på nytt og velg «Others» på innloggingsskjermen. Tast inn brukernavnet manuelt og velg «GNOME» fra listen.
11. Sett opp temaer, etc. Conky installeres med <kbd>Alt</kbd> + <kbd>F2</kbd> `gnome-sessions-properties`. Husk `ttf-dejavu-extra` (`$ sudo apt-get install ttj-dejavu`), `evince` (`$ sudo apt-get install evince`), `ttf-mscorefonts-installer`, `texlive-full` (`$ getnonfreefonts-sys -a -f -v`), `emacs23`, `emacs23-common`, `emacs23-el`, `auctex`, `git-all`.
