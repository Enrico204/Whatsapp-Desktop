#!/bin/bash

node -v 2>&1 > /dev/null
if [ $? -ne 0 ]; then
    echo "Missing nodejs executable"
    exit 1
fi

editor package.json
editor app/package.json
editor debian/changelog
editor whatsapp-desktop.spec
editor it.enrico204.whatsapp-desktop.appdata.xml

yarn
