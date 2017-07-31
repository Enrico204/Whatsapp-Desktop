# WhatsApp Desktop [![Build Status](https://travis-ci.org/Enrico204/Whatsapp-Desktop.svg?branch=master)](https://travis-ci.org/Enrico204/Whatsapp-Desktop)

WhatsApp desktop client, based on the official WhatsApp web app. Build with [Electron](http://electron.atom.io/).  

This is **NOT** an official product. This project does not attempt to reverse engineer the WhatsApp API or attempt to reimplement any part of the WhatsApp client. Any communication between the user and WhatsApp servers is handled by official WhatsApp Web itself; this is just a native wrapper for WhatsApp Web, like a browser.

Original version of WhatsApp Desktop was written by @bcalik there: https://github.com/bcalik/Whatsapp-Desktop

## Features

* Cross platform (OSX, Windows, Linux)
* Native notifications
* System tray icon
* Open links in browser
* Badge with the number of notifications in the dock/taskbar
* Dock icon bounces when a new message is received
* Focus on contact search input via CMD+F (WIN+F)
* Phone info window (s/w versions, battery status, etc)
* Auto-launch on login
* Start minimized to tray icon
* Logging system (log to console and *userData*/log.log)
* A couple of things can be configured:
  * Toggle avatar visibility
  * Toggle preview of the messages visibility
  * Set the size for the media thumbs
  * Proxy settings connect to WhatsApp web

## Installation on ArchLinux

You can download the ArchLinux package from https://aur.archlinux.org/packages/whatsapp-desktop/

Thanks to @bil-elmoussaoui

## Installation on Debian/Ubuntu

You can download the DEB package from the [latest release](https://github.com/Enrico204/Whatsapp-Desktop/releases)

## Installation (no package / others platforms)

Download and run the WhatsApp file from the [latest release](https://github.com/Enrico204/Whatsapp-Desktop/releases).  

## How to use in Linux

In order to execute the program in Linux, first you should give it permission to the App:

    sudo chmod u+x WhatsApp
    ./WhatsApp

## Command line switches

    --debug-log         Switch file's log level to "debug" (default: "warn")

## Known issues

### Fonts rendering as rectangles after upgrade

Apparently it's caused by an issue of Electron with Pango. Downgrade Pango to `1.40.5` should temporarily fix this (until upstream bugfix by Electron devs). See #13

## Contributions

Contributions are welcome! For feature requests and bug reports please submit an [issue](https://github.com/Enrico204/Whatsapp-Desktop/issues).

## Build

To build from the source, run the following commands:

    npm install
    cd app/
    npm install
    cd ..
    npm run build:platform

where `build:platform` can be `build:linux` if you want to build only for Linux, `build:osx` for OSX only, `build:win` for Windows only, or simply `build` to build for all platforms.

You'll find artifacts into `dist/` directory.

### Building Windows build from non-Windows platforms

Wine needs to be installed. On OS X, it is installable via Homebrew:  

    brew install wine

On GNU/Linux you can install `wine` from your distro package manager.

Please mind that `wine` requires an Xorg display, so you should set correctly your DISPLAY env var (you can use `Xvfb` if you don't have/want a real Xorg display running)

### Build Debian package

After `npm run build:linux`, launch:

    debuild -b -uc -us

Note that if version is changed you should use `dch` first.
