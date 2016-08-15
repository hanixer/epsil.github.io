title: Oppgradere Python på OS X
date: 2014-01-07
---

Pakkehåndtering på OS X er et herk uten like. Her er det som skulle til for å installere Python-biblioteket [eyeD3](http://eyed3.nicfit.net/installation.html) med `pip`. Først, [installer pip](http://www.pip-installer.org/en/latest/installing.html) med `easy_install`:

    $ sudo easy_install pip

Deretter kan det være nødvendig å oppgradere `setuptools`:

    $ pip install --upgrade setuptools

Hvis dette ikke fungerer, prøv:

    $ sudo pip install --no-use-wheel --upgrade setuptools

Alternativt, last ned og kjør det offisielle [installasjonsskriptet](https://pypi.python.org/pypi/setuptools#unix-based-systems-including-mac-os-x):

    $ wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | sudo python

(Hvis `wget` ikke er installert ennå, gjør `$ brew install wget`. Hvis `brew` krangler, kjør `$ brew doctor` og påse at filrettigheter er som de skal være.)

Når `pip` *og* `setuptools` er installert, kan `pip`-pakken for `eye3D` finnes med `pip search`:

    $ pip search eyeD3
    $ pip install eyeD3-pip
