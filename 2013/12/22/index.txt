title: Last.fm Search Links
date: 2013-12-22
---

[Last.fm Search Links](http://userscripts.org/scripts/show/20252) er et nyttig skript for diverse musikknettsteder. Dessverre har den siste offisielle versjonen (2012.12.09) problemer med [Rate Your Music](http://rateyourmusic.com/). En uoffisiell [versjon 2013.09.10](http://userscripts.org/topics/131464) gjør noen endringer:

```javascript
{       // rym artist
        url:/^http:\/\/(?:www\.)?rateyourmusic\.com\/artist\/[\w#!:.?+=&%@!\-]+\/?$/i,
        mainPath:"div.profilehir",
        search:rymSearch
},
```

Men nå har Rate Your Music endret HTML-koden igjen, så dette virker ikke lenger. Det følgende ser ut til å fungere:

```javascript
{       // rym artist
        url:/^http:\/\/(?:www\.)?rateyourmusic\.com\/artist\/[\w#!:.?+=&%@!\-]+\/?$/i,
        mainPath:"div.section_artist_name",
        search:rymSearch
},
{       // rym album
        url:/^http:\/\/(?:www\.)?rateyourmusic\.com\/release\/\w+\/[\w#!:.?+=&%@!\-]+\/[\w#!:.?+=&%@!\-]+\/?$/i,
        search:rymSearch,
        mainPath:"div#content",
        artistPath:"table.album_info a.artist",
        albumPath:"div.album_title",
        placePath:"div.album_title"
},
```

* * * * *

**Oppdatering 2015-04-29:** En bruker ved navn [rocketman](http://userscripts-mirror.org/topics/131464.html) har vedlikeholdt koden.
