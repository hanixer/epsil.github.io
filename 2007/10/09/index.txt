title: AUCTeX på Windows
date: 2007-10-09
---

Jeg oppgraderte nylig til [GNU Emacs 22.1](http://www.gnu.org/software/emacs/), og det er i gledesrus over å ha fått [preview-latex](http://www.gnu.org/software/auctex/preview-latex.html) til å fungere at jeg skriver dette innlegget. preview-latex er et tillegg til LaTeX-modusen til Emacs, [AUCTeX](http://www.gnu.org/software/auctex/), som forhåndsviser matematiske uttrykk *i selve kildefilen*. Når jeg velger «Generate previews for document» fra Preview-menyen, blir bufferen min seende slik ut:

![](previewlatex.png)

Men merk at dette lille steget over i «WYSIWYG» *ikke* kludrer til skriveprosessen. Når jeg beveger markøren over uttrykkene, vises LaTeX-koden i stedet, som kan redigeres dersom det er behov for det. Så kan eventuelt en oppdatert forhåndsvisning genereres etterpå, når man har skrevet tilstrekkelig mye kode til at det er greit med en tilbakemelding på hva man faktisk «har gjort». Den største gevinsten med preview-latex er at det er *mye lettere* å få oversikt over hvor man befinner seg i dokumentet til enhver tid, og dersom man starter skriveøkten med å generere en forhåndsvisning, får man en tydelig visuell tilbakemelding om hva som er nye endringer og hva dokumentet inneholdt fra før.

Å få bildestøtten til GNU Emacs for Windows til å fungere kan imidlertid være en noe innfløkt affære, for denne støtten er ikke innebygd i selve programmet. Den enkleste måten å komme i gang på er å laste ned AUCTeX sin [Emacs + AUCTeX-pakke](ftp://alpha.gnu.org/gnu/auctex/emacs+auctex-w32-2007-07-07.zip), som inkluderer alle de nødvendige filene. Denne er det bare å pakke ut et passende sted, f.eks. `C:\Programfiler`, i hvilket tilfelle Emacs vil få plasseringen `C:\Programfiler\Emacs`. Så kan man starte opp Emacs ved å kjøre `C:\Programfiler\Emacs\bin\runemacs.exe` (lag ev. en snarvei til denne på skrivebordet).

Dersom en i stedet vil gjøre ting «selv» med utgangspunkt i [den offisielle Emacs-utgivelsen](http://ftp.gnu.org/pub/gnu/emacs/windows/emacs-22.1-bin-i386.zip), må en laste ned noen ekstra `.dll`-filer som plasseres i samme katalog som `emacs.exe` (eller, for å gjøre dem tilgjengelige for andre programmer også, i systemkatalogen `Windows\system` eller `Windows\system32`). Hvilke filer det er snakk om, er beskrevet i FTP-README-filen [`windows/README`](http://ftp.gnu.org/pub/gnu/emacs/windows/README), og de kan lastes ned enkeltvis fra [G*nu*W*in*32](http://gnuwin32.sourceforge.net/)-prosjektet.

<!--
For å gjøre ting litt enklere for folk har jeg laget en Zip-fil med alle `.dll`-filene Emacs kan nyttiggjøre seg av:
-->

Når alt er på plass, enten man går for pakkeløsningen eller installerer [Emacs](http://ftp.gnu.org/pub/gnu/emacs/windows/emacs-22.1-bin-i386.zip), `.dll`-filene og [AUCTeX](http://ftp.gnu.org/pub/gnu/auctex/auctex-11.84.zip) manuelt, er det vel verdt å ta en kikk på [Claus Dethlefsens LaTeX/Emacs-side](http://www.math.aau.dk/%7Edethlef/Tips/tuning.html), som tar for seg fintilpasning med [gnuserv](http://www.wyrdrune.com/gnuserv.html) (lastes ned separat). Selv har jeg bl.a. dette i `.emacs`-filen min:

```lisp
(load "gnuserv")
(gnuserv-start)
(setq gnuserv-frame (selected-frame))

(add-hook 'text-mode-hook 'turn-on-auto-fill)
(add-hook 'text-mode-hook '(lambda ()
  (setq show-trailing-whitespace t)))
(global-font-lock-mode t)
(setq-default indicate-empty-lines t)
(column-number-mode t)
(size-indication-mode t)
(cua-mode t)
(setq cua-enable-cua-keys nil)
(show-paren-mode t)
(setq show-paren-delay 0)
(global-hl-line-mode t)
(set-face-background 'hl-line "#fffacd")
(setq skeleton-pair t)
(global-set-key "(" 'skeleton-pair-insert-maybe)
(global-set-key "[" 'skeleton-pair-insert-maybe)
(global-set-key "{" 'skeleton-pair-insert-maybe)
(setq disabled-command-hook nil)
(fset 'yes-or-no-p 'y-or-n-p)
(setq visible-bell t)
(setq inhibit-startup-message t)

(require 'ido)
(ido-mode t)

(load "auctex.el" nil t t)
(load "preview-latex.el" nil t t)
(require 'tex-mik)
(add-hook 'LaTeX-mode-hook 'LaTeX-math-mode)
```

Det blir for mye å gå inn på hva alt dette gjør (men se bloggen [M-x all-things-emacs](http://www.emacsblog.org/) for mange nybegynnertips), men de fire siste linjene laster inn AUCTeX og preview-latex med MiKTeX-oppsett og automatisk aktivering av AUCTeX sine mattefunksjoner når Emacs går inn i LaTeX-modus.

Dersom alt har gått som det skulle, vil AUCTeX tre i kraft når du åpner en fil med endelsen `.tex`, og du kan generere forhåndsvisninger fra Preview-menyen. (Alt dette forutsetter naturligvis at du har en fungerende TeX-distribusjon på systemet, som f.eks. [MiKTeX](http://miktex.org/). Merk at plasseringen til alle de kjørbare filene til TeX-distribusjonen må være oppført i miljøvariabelen `PATH`, slik at TeX-programmene blir tilgjengelige som *kommandoer* på kommandolinjen, for det er ved å sende instruksjoner til kommandolinjen at Emacs er i stand til å nyttiggjøre seg av TeX-distribusjonen din.)
