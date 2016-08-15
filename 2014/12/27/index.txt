title: Komprimere profilmappen til Firefox
date: 2014-12-27
---

Profilmappene til Firefox og Thunderbird kan ta stor plass på grunn av [ukomprimerte SQLite-databaser](http://en.kioskea.net/faq/2285-compacting-sqlite-bases-of-firefox-3). Man kan komprimere dem manuelt med følgende kommando:

    $ for f in *.sqlite; do sqlite3 "$f" "VACUUM"; done

Firefox-profilmappen befinner seg i `~/Library/Application Support/Firefox/Profiles` og Thunderbird-profilmappen i `~/Library/Thunderbird/Profiles`.

Utvidelsen [EPUBReader](https://addons.mozilla.org/en-US/firefox/addon/epubreader/) kan lage en stor `epub`-mappe i profilmappen til Firefox. Denne er det bare å slette med jevne mellomrom.
