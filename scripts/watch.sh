#!/bin/bash

set -e

npm run clear 
node ./scripts/info.js 
watchify ./lib/index.js -o 'exorcist ./dist/$npm_package_name.js.map > ./dist/$npm_package_name.js' -d