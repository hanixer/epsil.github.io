title: Musikkimporteringsrutiner
date: 2014-01-27
---

1.  Konverter FLAC til MP3 med [foobar2000](http://www.foobar2000.org/).
    -   Lagre disse innstillingene som et oppsett «MP3 320»: *Format: MP3 (LAME), 320 kbps CBR. Output to source track folder. File name pattern: `%filename%`.*
    -   Husk å slette FLAC-filene etterpå (kan i foobar2000 gjøres med *File Operations* -> *Delete files*).
2.  Last ned bilder med [Album Art Downloader](http://sourceforge.net/projects/album-art/). (Man kan også bruke iTunes' *Get Album Artwork*-funksjon, men denne krever Apple-ID.)
    -   `folder%preset%.%extension%|cover%preset%.%extension%`
    -   *Automatically download and save the first result that meets set criteria*
    -   *Last.fm Cover* først, deretter *All* for gjenværende album.
    -   **Merk:** Programmet krasjer for mer enn 150 album, så stykk opp arbeidet om nødvendig.
3.  Tagg filene med [Mp3tag](http://www.mp3tag.de/en/).
    -   For bildetagging, bruk en egendefinert regel som velger `folder.jpg`, `folder.png`, `cover.jpg` eller `cover.png`, i den rekkefølgen.
4.  Kopier filene over i nye mapper.
    -   Mapper og filnavn bør være på formen: `Artist/Album/Spornummer Tittel.mp3`
    -   I foobar2000 med *File Operations* -> *Copy to*: `$ascii(%album artist%\%album%\$if(%discnumber%, %discnumber%-)%tracknumber% %title%)`
    -   Påse at *Copy entire source code content* er krysset av.
5.  Slett spillelister:
    -   M3U- og M3U8-filer: `find . -iname "*.m3u*" -exec rm {} \;`
    -   PLS-filer: `find . -iname "*.pls" -exec rm {} \;`
