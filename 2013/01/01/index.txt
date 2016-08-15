title: Last.fm-sortering i foobar2000
date: 2013-01-01
---

En lærerikt C++-oppgave ville være å skrive et Last.fm-programtillegg for foobar2000. Dette blir et rent Windows-prosjekt, og jeg må sette opp [Visual Studio Express](http://www.microsoft.com/visualstudio/eng/products/visual-studio-2010-express) (2010-utgaven for Windows XP). I tillegg trenger jeg [SDK](http://www.foobar2000.org/SDK)-en for foobar2000.

Det finnes [eksempelkode](http://foosion.foobar2000.org/components/?id=tutorial1) og litt [Doxygen](http://foosion.foobar2000.org/doxygen/)-dokumentasjon. Mest hjelp er det likevel i denne [innføringen](http://yirkha.fud.cz/tmp/496351ef.tutorial-draft.html) fra 2009.

Jeg kan ta utgangspunkt i kildekoden til [foo\_scrobblecharts](https://github.com/Chronial/foo_scrobblecharts) ([foo\_softplaylists](http://www.hydrogenaudio.org/forums/index.php?showtopic=76133&st=375&p=815519&#entry815519) er frigitt, men på 5000 linjer).

* * * * *

**Oppdatering:** [foo\_lastsort](https://github.com/epsil/foo_lastsort) er realisert. Betingelsene til Last.fm begrenser antall forespørsler til fem i sekundet (gjennomsnitt over fem minutter), så koden er utstyrt med en timer som sørger for at en enkelt forespørsel tar minst 0,2 sekunder. Ikke implementert ennå er mulighet for å endre API-nøkkelen og lagre Last.fm-informasjonen i databasen til foobar2000.

For å viderebehandle spillelister sortert etter Last.fm, se [last.py](https://github.com/epsil/lastpy).
