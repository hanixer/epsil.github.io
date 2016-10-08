title: Dia on OS X
date: 2015-06-25
abstract: Some notes on using the graphics program [Dia](http://dia-installer.de/) on OS X.
image: ../dia.svg
image-width: 70
lang: en
css: ../custom.css
---

If Dia crashes
--------------


If [Dia](http://dia-installer.de/) crashes on OS X Yosemite because of a GTK error, apply the following [solution](http://navkirats.blogspot.no/2014/10/dia-diagram-mac-osx-yosemite-fix-i-use.html):

1.  Open the file `/Applications/Dia.app/Contents/Resources/bin/dia` in a text editor.
2.  Add the line `export DISPLAY=:0` after line 39.
3.  Quit XQuartz if it is running and restart Dia.

(If this does not work, try adding `export DISPLAY=:0` to `~/.bash_profile`.)

Export to PDF
-------------

To create a PDF file, it is best to export to EPS first (with Pango fonts) and then [convert to PDF](http://www.dark.ca/2009/07/16/getting-dia-to-give-you-a-pdf/):

    $ epstopdf diagram.eps

`epstopdf` is included in TeX Live ([MacTeX](http://tug.org/mactex/)).

Convert PDF to SVG
------------------

### With `pdf2svg`

To convert to SVG, it is better to [convert to PDF](http://superuser.com/questions/198460/converting-from-eps-to-svg-format#answer-542987) first than to export directly or convert from EPS. PDF can be converted to SVG with [`pdf2svg`](http://www.cityinthesky.co.uk/opensource/pdf2svg/) (may be installed with `$ brew install pdf2svg`):

    $ pdf2svg diagram.pdf diagram.svg

To convert a specific page:

    $ pdf2svg diagrammer.pdf diagram.svg 20

Unfortunately, `pdf2svg` has no options for cropping. For this, one can use [PDF Scissors](https://sites.google.com/site/pdfscissors/) (graphics) or [PDFtk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) (command line).

### With Inkscape

It seems that `pdf2svg` runs into problems with some PDF files. An alternative is to use [Inkscape](http://inkscape.org/), which can be [run from the terminal](http://stackoverflow.com/questions/10288065/convert-pdf-to-clean-svg#answer-10290006):

    $ inkscape --without-gui --file=diagram.pdf --export-plain-svg=diagram.svg

This is apparently the conversion method recommended by [Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Graphics_Lab/Resources/PDF_conversion_to_SVG#Conversion_with_Inkscape).
