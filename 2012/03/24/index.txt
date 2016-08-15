title: GUI-programmering med Qt
date: 2012-03-24
---

God bok om GUI-programmering med Qt: [*C++ GUI Programming with Qt 4*](http://www.amazon.com/dp/0132354160/), Prentice-Hall. «The official book on Qt from Trolltech».

`qmake` brukes for å lage en `Makefile` som forteller `g++` hvor Qt-bibliotekene er:

    $ qmake -project
    $ qmake

Deretter kan prosjektet kompileres med `make`. (Qt Creator håndterer dette automatisk.)
