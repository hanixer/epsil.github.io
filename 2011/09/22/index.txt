title: Kjøre MPD lokalt
date: 2011-09-22
---

MPD kan deaktiveres i oppstarten ved å sette `START_MPD=FALSE` i `/etc/default/mpd`. Alternativt kan man kjøre `$ update-rc.d mpd disable`, som deaktiverer alle symlinker til `/etc/init.d/mpd`. Fortrinnet med å kjøre MPD som lokal bruker (med konfigurasjon i `~/.mpdconf` og database i `~/.mpd`) er raskere oppstart, og at man slipper å sette opp PulseAudio Preferences.
