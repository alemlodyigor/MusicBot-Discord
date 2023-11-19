# Simple discord music bot

Bot can play song from YouTube, SoundCloud and Spotify. <br>
Language: pl

# Commands / Features

!h - commands <br>
!l - on/off current song loop <br>
!np - now playing <br>
!p [title, url] - add song to queue <br>
!q - queue <br>
!s - skip song <br>
!sall - skip queue <br>
!pause - pause/resume playing songs <br>
!unpause - resume playing songs <br>
!shuffle - shuffle songs in queue <br>
!v - set volume <br>

# Configuration

1. Create file .env next to "index.js" <br>
2. Add variable "TOKEN" with your dc bot token<br>
3. Enjoy of using! <br>

Example of .env file: <br>
TOKEN=1235712635172635176237123

# How to play songs from YT with age restriction

1. Create "cookies.json" next to "index.js" <br>
2. Install <a href="https://www.editthiscookie.com/">EditThisCookie</a><br>
3. Go to <a href="https://www.youtube.com/">Youtube</a><br>
4. Log in to your account (should use new account!)<br>
5. Click on the extension icon and click "Export" <br>
6. Copy the content and paste it into "cookies.json" <br>

Example of cookies.json: <br>

```json
[
    {
        "domain": ".youtube.com",
        "expirationDate": 1234567890,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "value": "---xxx---",
    },
],
```

# Hints

If you want to use this bot 24/7 and not worry about restarting bot (potencial errors) install pm2. <br>

```
npm install pm2 -g
```

```
pm2 start index.js
```

```
pm2 status
```

# IMPORTANT

Based on <a href="https://github.com/distubejs/example/tree/v4">DisTube Example bot </a><br>
If you enjoyed my work leave a star :D <br>
You can leave a feedback by mail me: kontakt@alemlodyigor.pl
