title: Cache bakgrunnsbilder i Internet Explorer
date: 2003-03-20
---

Vel, det later til at jeg endelig har fått til å rekonstruere denne feilen som så mange snakker om, og muligens til og med har funnet en løsning på problemet. Årsaken til at bildene «blinker» i Internet Explorer er at IE -- av en eller annen merkelig grunn -- bestemmer seg for å laste ned bakgrunnsbilder i CSS på nytt i ett sett dersom enkelte egenskaper og verdier er brukt (se artikkelen [«Minimizing Flickering CSS Background Images in IE6»](http://www.fivesevensix.com/studies/ie6flicker/) for detaljer). I hvilken grad denne blinkingen finner sted, avhenger av hva «Se etter nyere versjoner av lagrede sider» under `Verktøy | Alternativer for Internett | Generelt > Midlertidige Internett-filer > Innstillinger` er satt til. Jeg antar at standardinnstillingen her er «Automatisk».

<!--
HalTan o.a. har kanskje noe mer hysterisk som «Hver gang siden vises» i stedet (ikke noe vondt ment).
-->

Forsinkelsen oppstår altså fordi den besøkende må vente på at bildet lastes ned på nytt. En måte å forhindre dette på, er ved å ta *cache-styrende HTTP-felt* i bruk. Med «cache» menes her mellomlager. Dette er noe de fleste nettlesere er utstyrt med -- IEs går også under tittelen «Midlertidige Internett-filer». Konseptet er at nettsider og relaterte filer lagres midlertidig et sted på harddisken (eller lokalt), slik at nettleseren kan hente data som går igjen på flere sider fra dette i stedet for å måtte laste ned alt sammen på nytt hver eneste gang. Dette gjør også IE dersom mellomlager-innstillingen er satt til «Hver gang Internet Explorer startes» eller noe høyere -- men, som vi har sett, altså ikke for «rollover»-bildene angitt i stilsettet. Hvis vi derimot klarer å *tvinge* IE til å lagre også disse lokalt, skulle problemet være ute av verden.

Dermed kommer vi inn på HTTP-felt. Hver gang en fil overføres via HTTP, legger serveren med litt metadata (data om data) i en *startblokk* før selve filen. Startblokken består av ren tekst, og en tekstlinje i startblokken kalles et *felt.* For å se hva slags startblokker som er i omløp på WWW, kan man bruke tjenesten [HTTP Header Viewer](http://www.delorie.com/web/headers.html).

For å gjøre websider og -filer mer «cache-vennlige» (og dermed *raskere å laste* -- ja, nå spisser dere vel ørene, ikke sant?), kan man ta det jeg kaller cache-styrende HTTP-felt i bruk. For mer informasjon om dette, les artikkelen [«Caching Tutorial for Web Authors And Webmasters»](http://www.mnot.net/cache_docs/). Her vil jeg bare forklare hvordan vi blir kvitt «rollover»-problemet på en Apache-server ved å bruke konfigurasjonsfilen [`.htaccess`](http://wsabstract.com/howto/htaccess.shtml).

Kort fortalt ønsker vi å sende to «cache-felt» med alle «rollover»-bilder: «Cache-Control», som angir hvor lenge fila skal beholdes i mellomlageret, og «Expires», som forteller når den lokale fila «utgår» -- dette er bare av hensyn til eldre nettlesere. Dette styrer vi i Apache med funksjoner fra de to *modulene* `mod_expires` og `mod_headers`. (En modul er et programtillegg til Apache. For at det følgende skal fungere, må begge disse være installert -- kontakt webhotellet ditt for detaljer.)

Dersom vi har plassert alle «rollover»-bildene i en egen mappe, f.eks. `rollovers`, kan vi plassere en tekstfil med filnavnet `.htaccess` som inneholder ekstra serverinstruksjoner for disse filene i denne mappen. Kopier følgende inn i en passende tekstbehandler:

    ExpiresActive on
    ExpiresDefault "access plus 1 day"
    Header append Cache-Control "must-revalidate"

Å få lagret filen med navnet `.htaccess` kan være litt problematisk på Windows-plattformen, men heldigvis fins det en enkel løsning. I Notisblokk skriver vi ganske enkelt `".htaccess"` -- *med* anførselstegnene -- i `Filnavn`-feltet i `Lagre som`-dialogvinduet. Til slutt laster vi opp denne filen til samme mappe som «rollover»-bildene befinner seg i, altså rollovers. For å kontrollere at dette fungerer som det skal, sjekker vi adressen  `http://www.example.org/rollovers/bilde.png` med [HTTP Header Viewer](http://www.delorie.com/web/headers.html). Dersom serveren har tatt notis av instruksjonene i `.htaccess`-fila, vil startblokken bl.a. inneholde to tekstlinjer som begynner med henholdsvis «`Expires:`» og «`Cache-Control:`».

Dersom de nødvendige modulene *ikke* er installert, vil serveren i stedet svare med en 500-feilmelding. Hvis bare funksjonene i `mod_headers` er tilgjengelige, kan vi heller skrive

    Header set Cache-Control "max-age=86400, must-revalidate"

i `.htaccess.`

Etter omfattende testing av dette på min lokale Apache-server, ser det faktisk ut til at dette fjerner blinkingen for godt. IE behandler altså bildene på samme måte som enhver *fornuftig* nettleser gjør (dette problemet er ikke-eksisterende i Opera og Mozilla) -- uavhengig av hvordan «Midlertidige Internett-filer» er konfigurert. Følgelig lastes også sidene raskere. Dersom du ikke har tilgang til disse funksjonene på webhotellet ditt -- *klag,* eller bytt webhotell. Nei, dette har ikke noe med CSS-rollovers å gjøre. *HTTP-kontroll er et* must *for alle med egen hjemmeside.*

For mer informasjon om HTTP, se W3C-dokumentet [«Common HTTP Implementation Problems»](http://www.w3.org/TR/chips).

<!--
Har jeg forresten nevnt at søkemotorer setter stor pris på *skikkelige* HTTP-startblokker?
-->
