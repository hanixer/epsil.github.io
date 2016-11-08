title: Klone harddisk
date: 2010-11-27
---

Jeg fikk nylig en ny bærbar i hende og trengte en enkel måte å klone den gamle harddisken på, heller enn å installere alt på nytt. (Ubuntu-installasjoner er svært flyttbare takket være glimrende autodeteksjon av maskinvare.) Slik gikk jeg frem:

`dd` er et kraftig kommandolinjeverktøy som leser fra og skriver til disker på lavnivå. `nc`, AKA NetCat, overfører data over nettverket. Alt som trengs er å kombinere disse: Den gamle maskinen leser data og sender dem til den nye, som i sin tur skriver dem til harddisken.

For å få nettverk, la jeg i all enkelhet en krysset TP-kabel (RJ45) mellom maskinene. Deretter startet jeg opp maskinene fra noen Ubuntu 10.04- og 10.10-CD-er jeg hadde liggende for å kjøre Linux uten å aksessere harddisken. Jeg valgte nødmodusen («recovery mode») fordi den stilte alle de riktige spørsmålene -- hvilken IP-adresse maskinen skulle ha (192.168.1.10 og .11), hvorvidt filsystemet skulle monteres (nei) -- før den overlot styringen til meg gjennom et enkelt, men kraftig rootshell.

På maskinen jeg skulle kopiere *til*, skrev jeg nå følgende:

    nc -l -p 8888 | dd of=/dev/sda

Dette satte maskinen til å lytte på port 8888 og skrive alt den mottok derfra *direkte* til den nye harddisken, `/dev/sda`. Sterk kost! På maskinen jeg skulle kopiere *fra*, skrev jeg:

    dd if=/dev/sda | nc 192.168.1.10 8888

Dermed begynte den gamle maskinen å lese fra harddisken, blokk for blokk, og sende alt sammen over til den nye.

Så var det bare å vente (den nye maskinen sluttet å lytte straks den gamle var ferdig med å sende). For min del tok dette 6 timer for 250 GB, altså ca. 12 MB/s. Ved å bruke `bzip`-komprimering og en fornuftig blokkstørrelse kan tiden halveres, avhengig av dataene som overføres;^[<http://www.ndchost.com/wiki/server-administration/netcat-over-ssh>] hvis man har en maskin med rom for to harddisker, er dét naturligvis enda raskere. Søk ellers på «[dd over netcat](http://www.google.no/search?q=dd+over+netcat)» og «[dd over ssh](http://www.google.no/search?q=dd+over+ssh)» for mer info. (Den som ønsker et mer polert verktøy med GUI og fremdriftsindikatorer, kan kikke på [Clonezilla](http://clonezilla.org/) eller [PING](http://ping.windowsdream.com/), men også disse bruker `dd` i bunnen.)

Det slående med denne prosedyren er hvor enkel den er. `dd` leser fra og skriver til harddiskene, `nc` sender dataene over nettverket, og pipe-operatoren, `|`, kobler de to sammen. Dette er et elegant eksempel på «Unix power», hvor små og kraftige verktøy kombineres for å utføre større oppgaver.

Til slutt et stalltips til alle dual-bootere: lag en diskavbildning av Windows-installasjonen i Linux! `dd`, `ntfsclone` eller `partimage` gjør jobben. Straks Windows-installasjonen får et virus eller noe, som iallfall min gjør med jevne mellomrom, er det bare å gå inn i det friske Linux-systemet og gjenopprette avbildningen. Ingen bekymringer!
