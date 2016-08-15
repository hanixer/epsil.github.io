title: Starte Gollum med `launchd`
date: 2013-12-20
---

På OS X startes [Gollum](https://github.com/gollum/gollum) automatisk med [`launchd`](http://www.nomachetejuggling.com/2012/05/15/personal-wiki-using-github-and-gollum-on-os-x/). Opprett en fil `~/Library/LaunchAgents/com.personalwiki.gollum.plist` (med eksklusive [rettigheter](http://stackoverflow.com/questions/16809861/launchd-doesnt-launch-my-daemon), dvs. `$ chmod 600`) som inneholder dette:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.user.gollum</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/gollum</string>
    <string>/Users/vegard/Documents/wiki</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

* * * * *

**Oppdatering 2016-07-29:** Å få [http-server](https://github.com/indexzero/http-server) til å starte automatisk krever at man eksplisitt oppgir plasseringen til `node`, for [`launchd` leser ikke `/usr/local/bin`](http://apple.stackexchange.com/questions/106355/setting-the-system-wide-path-environment-variable-in-mavericks). Serveren startes med Bash-skriptet `start_httpserver.sh`:

```bash
#!/bin/bash
NODE="/usr/local/bin/node"
PROGRAM="/usr/local/bin/http-server"
HTTPSERVER="$NODE $PROGRAM"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
$HTTPSERVER . -p 8000
```

Skriptet refereres så av `~/Library/LaunchAgents/com.personalwiki.httpserver.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.user.httpserver</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/vegard/Documents/wiki/start_httpserver.sh</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardErrorPath</key>
  <string>/tmp/mycommand.err</string>
  <key>StandardOutPath</key>
  <string>/tmp/mycommand.out</string>
</dict>
</plist>
```

For å kunne [debugge `launchd`](http://stackoverflow.com/questions/6337513/how-can-i-debug-a-launchd-script-that-doesnt-run-on-startup#answer-29926482) dersom noe skulle gå galt, loggføres resultatet til `StandardErrorPath` og `StandardOutPath`.
