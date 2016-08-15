title: Nettilkobling med iPhone
date: 2015-12-05
---

Last ned og installer iTunes på datamaskinen. iTunes inkluderer en driver som gjør det mulig å koble til iPhone med USB.

På iPhone, gå til *Delt Internett* under *Innstillinger* og aktiver deling. Koble telefonen til datamaskinen med en USB-kabel. Nettilkoblingen dukker nå opp som kablet nett.

* * * * *

Dele tilkoblingen i Hyper-V:

Åpne Hyper-V og velg *Virtual Switch Manager*. Konfigurer en svitsj som kobler til *Apple Mobile Device Ethernet*. Kryss av for *Allow management operating system to share this network adapter*.

Høyreklikk på den virtuelle maskinen, velg *Settings* og velg svitsjen under *Network Adapter*. Start den virtuelle maskinen og påse at Internett fungerer.

(Hvis Internett ikke fungerer i den virtuelle maskinen, kan det være at noen gamle innstillinger ligger igjen. Åpne *Network Connections* i Control Panel, høyreklikk på adapteren og velg *Properties*. Påse at TCP/IPv4-innstillingene er satt til å autodetektere både IP-adresse og DNS-server.)
