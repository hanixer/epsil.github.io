title: Greasemonkey-skript for Last.fm
date: 2012-05-03
---

[Last.fm](http://last.fm/) viser *ikke* totalt antall lytt under «Tracks» eller «Charts». Last.fm viser antall lytt *de siste seks månedene*. Dette favoriserer nye utgivelser.

Hvis jeg skal bruke Last.fm til å oppdage klassiske låter, trenger jeg de totale tallene, som finnes på siden til hver enkelt låt. Kan jeg skrive et Greasemonkey-skript som importerer denne informasjonen inn i «Charts»? Boken *Greasemonkey Hacks* av Mark Pilgrim, fra 2005, kan være et utgangspunkt.

* * * * *

**Oppdatering:** Jeg har lykkes! Takket være jQuery var det ikke mye kode å skrive:

```javascript
$("#trackChart tbody tr").each(function() {
    var cell = $('<td class="playCount">');
    var url = $(this).find(".subjectCell a").attr("href");
    $(this).append(cell);
    cell.load(url + " [itemprop=playCount]");
});
```

<!--
Men, la meg se litt kvantitativt på dette. For å skrive de 6 linjene over, (skum)leste jeg 4 kapitler av *Greasemonkey Hacks*, 120 sider av *JavaScript & jQuery: The Missing Manual*, og ytterligere 20 sider av *jQuery in Action*. Hvis jeg runder ned dette til 12 timers arbeid, har jeg altså brukt gjennomsnittlig to timer per linje kode. Det tar tid å skaffe seg oversikt.
-->

Jeg har også funnet to foobar2000-komponenter, [foo\_scrobblecharts](http://chronial.de/foobar2000/#foo_scrobblecharts) og [foo\_softplaylists](http://www.foobar2000.org/components/view/foo_softplaylists), som sorterer musikken i henhold til Last.fm. (Det later til at man *kan* kjøre foobar2000 under Linux med Wine, bare man bruker `winetricks` og installerer nødvendige DLL-er (og skriften Tahoma for bedre utseende). Om dette er en *god* idé er en annen sak.)
