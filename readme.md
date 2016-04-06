# WhatsApp Desktop

WhatsApp desktop client, based on the official WhatsApp web app. Build with [Electron](http://electron.atom.io/).  

This is **NOT** an official product. This project does not attempt to reverse engineer the WhatsApp API or attempt to reimplement any part of the WhatsApp client. Any communication between the user and WhatsApp servers is handled by official WhatsApp Web itself; this is just a native wrapper for WhatsApp Web, like a browser.

## Features

* Cross platform. (OSX, Windows, Linux)  
* Native notifications.  
* System tray icon.  
* Open links in browser.  
* Badge with the number of notifications in the dock/taskbar.  
* Dock icon bounces when a new message is received.  
* Focus on contact search input via CMD+F (WIN+F).  
* A couple of things can be configured:  
  * Display or not the avatars  
  * Display or not the preview of the messages  
  * Set the size for the media thumbs  
  * Set proxy to connect to WhatsApp web  

**Planned features:**  

* Auto-launch on OS startup.  

## Installation

Download and run the WhatsApp file from the [latest release](https://github.com/bcalik/Whatsapp-Desktop/releases).  

*Note: Windows and Linux versions are test release.*

## How to use in Linux

In order to execute the program in Linux, first you should give it permission to the App:

`sudo chmod u+x WhatsApp`  
`./WhatsApp`  

## Contributions

Contributions are welcome! For feature requests and bug reports please submit an [issue](https://github.com/bcalik/Whatsapp-Desktop/issues).

## Build

To build from the source, run the following commands:  

`npm install`  
`npm run build`  

## Building Windows build from non-Windows platforms

Wine needs to be installed. On OS X, it is installable via Homebrew:  
`brew install wine`

--

> Made with :heart: at [Macellan](http://macellan.net)
