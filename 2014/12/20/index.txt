title: Oppgradere Homebrew
date: 2014-12-20
---

Etter oppdatering til OS X Yosemite feiler `brew` med følgende feilmelding:

    /usr/local/bin/brew: /usr/local/Library/brew.rb: /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby: bad interpreter: No such file or directory
    /usr/local/bin/brew: line 26: /usr/local/Library/brew.rb: Undefined error: 0

`brew update` feiler også. For å løse problemet, [oppgrader med Git](http://apple.stackexchange.com/questions/153790/how-to-fix-brew-after-its-upgrade-to-yosemite):

    $ cd /usr/local/Library
    $ git pull origin master

Kjør deretter `$ brew update` for å oppdatere til siste versjon.
