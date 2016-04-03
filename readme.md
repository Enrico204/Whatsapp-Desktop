# WhatsApp Desktop

WhatsApp desktop client for OSX and Windows, based on the official WhatsApp web app. Build with [Electron](http://electron.atom.io/).  

This is **NOT** an official product. This project does not attempt to reverse engineer the WhatsApp API or attempt to reimplement any part of the WhatsApp client. Any communication between the user and WhatsApp servers is handled by official WhatsApp Web itself; this is just a native wrapper for WhatsApp Web, like a browser.

**For questions and support please use the Gitter room:**

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/rephole/WhatsApp-Desktop)


## Features

* Native notifications.  
* System tray icon.  
* Open links in browser.  
* Badge with the number of notifications in the dock/taskbar.  
* Dock icon bounces when a new message is received.
* Focus on contact search input via CMD+K (WIN+K)
* A couple of things can be configured:
  * Display or not the avatars
  * Display or not the preview of the messages
  * Set the size for the media thumbs
  * Set proxy to connect to WhatsApp web

**Planned features:**  

* Auto-launch on OS startup.  
* Linux build.  

## Installation

Download and run the WhatsApp.app or WhatsApp.exe file from the [latest release](https://github.com/bcalik/Whatsapp-Desktop/releases).  

*Note: Windows version is a test release.*

## Contributions

Contributions are welcome! For feature requests and bug reports please submit an [issue](https://github.com/bcalik/Whatsapp-Desktop/issues).

## Build

To build from the source, run the following commands:  

`npm install`  
`npm run build`  

## How to use in Linux

In order to execute the program in Linux, firt you should give it permission to the App:

sudo chmod u+x WhatsApp
./WhatsApp 

--

> Made with :heart: at [Macellan](http://macellan.net)
