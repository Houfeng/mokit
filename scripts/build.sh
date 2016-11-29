#!/bin/bash

set -e

npm run clear 
node ./scripts/info.js 
browserify ./lib/index.js | uglifyjs -m  > ./dist/$npm_package_name.js