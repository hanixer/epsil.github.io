title: Oppgradere Gollum
date: 2014-09-19
---

Ved en oppdatering av Command Line Tools for Xcode sluttet Gollum å fungere. Det var nødvendig å bekrefte lisensen med:

    $ sudo xcodebuild -license

Deretter kunne Gollum oppdateres:

    $ gem uninstall gollum
    $ sudo gem install gollum
