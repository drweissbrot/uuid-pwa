# uuid-pwa

Generate UUIDs using your browser's built-in crypto library.

This project is live on https://uuid.brot.phd (and https://guid.brot.phd if you're one of those people).
It is deployed via Cloudflare Pages (because GitHub Pages doesn't allow multiple domains).

You can also open https://copy.uuid.brot.phd (or https://copy.guid.brot.phd) to just copy a UUID to your clipboard and immediately close the tab.  
Note that the first time you open one of these pages, you will need to allow the app access to your clipboard.


## Why?
Sometimes I need a UUID to use an as example or placeholder or similar.
Other solutions I found generated UUIDs server-side, and that's just silly.
This project uses the `crypto.randomUUID` method that is supported by [all browsers anyone cares about](https://caniuse.com/mdn-api_crypto_randomuuid).  
This project is also a Progressive Web App, meaning that once it has been opened once, it can be used without an internet connection.

(also i just wanted to try building a pwa)


## Icon
The icon is `generator-mobile` from Material Design Icons v7.4.47 and was created by Michael Richins.
See https://pictogrammers.com/library/mdi/icon/generator-mobile/
