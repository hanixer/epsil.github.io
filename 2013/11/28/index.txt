title: iTerm2 som nedtrekksterminal
date: 2013-11-28
---

[iTerm2](http://www.iterm2.com/) kan brukes som [nedtrekksterminal](http://apple.stackexchange.com/questions/48796/iterm-as-a-slide-out-terminal-from-the-top-of-the-screen) i OS X. Under *Preferences* -> *Keys*, huk av for *Show/hide iTerm2 with a system-wide hotkey* (standard er <kbd>Alt</kbd> + <kbd>Space</kbd>) og *Hotkey toggles a dedicated window*. Velg *Hotkey Window* som vindusprofil (skal skje automatisk).

Hurtigtasten fungerer bare så lenge programmet kjører, så iTerm2 må settes opp til å [starte automatisk](http://rottmann.net/2013/03/launch-iterm-2-on-startup-without-opening-a-terminal-window/). Legg til en oppføring for iTerm2 under *Systemvalg* -> *Brukere og grupper* -> *Påloggingsobjekter*. Åpne iTerm2 og lukk alle vinduer. Velg *Window* -> *Save Window Arrangement* og kall oppsettet «No Windows». Sett dette oppsettet som standard under *Preferences* -> *Arrangements*. Huk så av for *Open default window arrangement* under *Preferences* -> *General*.

**Merk:** Fra nå av starter iTerm2 uten noen vinduer også når man åpner det fra Docken. Man kan åpne et vindu fra *Shell*-menyen (<kbd>Command</kbd> + <kbd>N</kbd>) eller ved å høyreklikke på ikonet og velge *New Window (Default Profile)*. Eller med følgende tastetrykk: <kbd>Alt</kbd> + <kbd>Space</kbd>, <kbd>Command</kbd> + <kbd>N</kbd>.
