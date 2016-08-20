title: Gruppering av CSS-stilark
date: 2004-03-09
---

I HTML kan du med `link`{.html}-elementet angi tre typer eksterne stilsett (stilark):

-   Grunnleggende stilsett
-   Foretrukne stilsett
-   Alternative stilsett

Jeg skriver bare «stilsett» fordi du med `style`{.html}-elementet -- som bortsett fra `rel`{.html} tar de samme attributtene som elementet `link`{.html} -- også kan angi grunnleggende og foretrukne stilsett. Et stilark er rett og slett en fil (vanligvis med endelsen `.css` når det som her er CSS vi snakker om) som inneholder et stilsett. For ordens skyld bør stilsettene angis i rekkefølgen vist over.

Vi har dessuten også *mediespesifikke* stilsett; du kan for hvert stilsett, uavhengig av hvilke grupperinger du gjør, bestemme hvilke medier det enkelte stilsettet skal gjelde for. Jeg kommer tilbake til dette senere.

Deklarasjonene i et *grunnleggende stilsett* blir brukt som standard (idet siden lastes), med mindre de overstyres i et påfølgende stilsett -- jf. «cascade»-prinsippet i CSS. (I denne artikkelen går jeg ut fra den forenklingen at et påfølgende stilsetts deklarasjoner *alltid* overstyrer tidligere deklarasjoner med tilsvarende selektor. Det er mulig å forhindre dette ved å markere deklarasjoner med `!important`{.css} eller benytte seg av mer spesifikke selektorer, men for enkelhetens skyld går jeg ikke nærmere inn på dette her.)

Med et grunnleggende stilsett slipper du å definere stildeklarasjoner som ellers ville gått igjen i påfølgende stilsett mer enn én gang. Dette kan for eksempel være nyttig i et tilfelle der du har laget to separate fargesammensetninger for siden din, men den visuelle utformingen (dvs. «layouten») fortsatt er den samme. Du angir et grunnleggende stilsett ved å sette `rel`{.html}-attributtet til `stylesheet`{.html} og utelate `title`{.html}-attributtet:

```html
<link href="grunnleggende.css" rel="stylesheet" type="text/css">
```

Det er for øvrig ingenting i veien for å ha *flere* grunnleggende stilsett, men merk at dersom disse angir de samme egenskapene for et bestemt element eller elementmengde (for de samme mediene), blir deklarasjonene i det siste stilsettet brukt. Hovedårsaken til at man vil bruke flere stilsett, er ofte å gjøre diverse tilpasninger til andre medier:

```html
<link href="felles.css" rel="stylesheet" type="text/css">
<link href="skjerm.css" media="screen" rel="stylesheet" type="text/css">
<link href="utskrift.css" media="print" rel="stylesheet" type="text/css">
```

Her har vi benyttet attributtet `media`{.html} til å spesifisere at stilarket `skjerm.css` bare skal brukes når siden vises på skjerm, og at `utskrift.css` bare gjelder når sidene skrives ut (eller utskriften forhåndsvises). Stilsettet i `utskrift.css` blir altså ikke brukt på skjerm, og stilsettet i `skjerm.css` blir ikke brukt ved utskrift. Standardverdien for `media`{.html}-attributtet -- altså den verdien som blir brukt dersom attributtet ikke spesifiseres -- er `all`{.html}, altså at stilsettet gjelder for alle medier. Stildeklarasjonene i `felles.css` kommer derfor med både på skjerm og ved utskrift, med mindre skjerm- og utskriftsstilsettene inneholder deklarasjoner som overstyrer disse.

Det går også fint an å angi at stilsettet skal gjelde for *flere* medier, ved å skille mediebeskrivelsene med komma:

```html
<link href="stilark.css" media="print,screen" rel="stylesheet" type="text/css">
```

Hva slags [mediebeskrivelser](http://www.w3.org/TR/html4/types.html#type-media-descriptors) du kan bruke og hva de står for, er beskrevet i [HTML 4.01-spesifikasjonen](http://www.w3.org/TR/html4/).

Alt dette er vel og bra dersom du kun ønsker ett utseende for siden din, med noe utskriftstilpasning og muligens litt ekstra tilrettelegging for andre medier. Men hva om du kunne tenke deg å utstyre siden din med *flere stiler*, slik at den besøkende kan velge den vedkommende liker best? Da må vi gjøre oss kjent med `title`{.html}-attributtet, som vi -- innlysende nok -- bruker for å gi ett eller flere stilsett en *tittel*. Jeg sier «ett eller flere» fordi du på denne måten kan *gruppere* stilsett, og f.eks. samle et generelt sideoppsett som inkluderer mindre tilpasninger til papir under *ett* navn.

Vi fortsetter med det forrige kodeeksemplet, som vi tenker oss er fra en side med en marineblå fargesammensetning. Med `title`{.html}-attributtet kan vi nå gi denne fargesammensetningen et navn:

```html
<link href="felles.css" rel="stylesheet" type="text/css">
<link href="skjerm.css" media="screen" rel="stylesheet" type="text/css">
<link href="utskrift.css" media="print" rel="stylesheet" type="text/css">
<link href="marineblaa.css" rel="stylesheet" title="Marineblå" type="text/css">
```

Stilarket `marineblaa.css` inneholder et såkalt *foretrukket* stilsett (som gjelder for både skjerm og utskrift, ettersom vi ikke har angitt `media`{.html}-attributtet). Dette inngår i sidens *foretrukne stil*. Det er altså stilen «Marineblå» som blir brukt første gang siden lastes, uavhengig av om vi har angitt en eller flere *alternative stiler* i tillegg. Kun én stil kan velges om gangen, og det er vanligvis også mulig å ikke velge noen stil i det hele tatt, slik at siden faller tilbake på de stildeklarasjonene som er angitt i grunnleggende stilsett.

Det er viktig å forstå at du med `title`{.html}-attributtet ikke angir navnet på ett bestemt stilsett, men derimot en unik stil -- som kan inkludere flere stilsett, også for forskjellige medier. Vi kan dele opp «Marineblå»-stilen i et skjermstilsett og et utskriftsstilsett, som bare blir brukt dersom stilen «Marineblå» er valgt:

```html
<link href="felles.css" rel="stylesheet" type="text/css">
<link href="skjerm.css" media="screen" rel="stylesheet" type="text/css">
<link href="utskrift.css" media="print" rel="stylesheet" type="text/css">
<link href="mbskjerm.css" media="screen" rel="stylesheet" title="Marineblå" type="text/css">
<link href="mbutskrift.css" media="print" rel="stylesheet" title="Marineblå" type="text/css">
```

Merk at `skjerm.css` og `utskrift.css` fortsatt inneholder grunnleggende stilsett. Dersom stilen «Marineblå» er valgt, styres altså utskriftens utseende av summen av `felles.css`, `utskrift.css` og `mbutskrift.css`, der et påfølgende stilsetts deklarasjoner overstyrer tilsvarende deklarasjoner i tidligere stilark. Dersom ingen stil er valgt, blir utskriften formatert etter summen av `felles.css` og `utskrift.css`.

Det er neppe verdt å ta seg bryet med å angi en foretrukken stil dersom man ikke i tillegg har angitt en eller flere alternative stiler. Disse må velges manuelt av den besøkende, og blir ikke brukt idet siden lastes for første gang (ettersom bare én stil -- i utgangspunktet den foretrukne stilen -- kan vises om gangen).

Du lager alternative stiler på samme måte som den foretrukne stilen, men `rel`{.html}-attributtet må nå settes til `alternate stylesheet`{.html}:

```html
<link href="sitrongul.css" rel="alternate stylesheet" title="Sitrongul" type="text/css">
```

Dersom dette legges til etter stilen «Marineblå», kan brukeren skifte utseende på siden ved å velge den alternative stilen «Sitrongul» med en funksjon i nettleseren. Både Opera og Mozilla -- men ikke Internet Explorer -- er utstyrt med dette. Ettersom IE fortsatt er den mest populære nettleseren generelt sett, er det blitt vanlig å ta i bruk en [JavaScript-løsning](http://www.alistapart.com/articles/alternate/) som lar den besøkende velge stil ved å klikke på lenker på selve siden. Dette går imidlertid på bekostning av markeringen, som ikke vil gi noen særlig mening i en nettleser som ikke støtter JavaScript (eller som har JavaScript avslått). (En annen mulighet er å la skripting på serversiden gjøre dynamiske inngrep i HTML-koden, slik at hvilken stil som angis som den foretrukne f.eks. styres av verdien til en GET-variabel.)
