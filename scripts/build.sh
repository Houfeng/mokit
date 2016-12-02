#!/bin/bash

set -e

npm run clear 
node ./scripts/info.js 
browserify ./lib/index.js | uglifyjs -m  > ./dist/$npm_package_name.js

rm -rf ./docs/dist/
mkdir -p ./docs/dist/
cp -rf ./dist/* ./docs/dist/

rm -rf ./docs/examples/
mkdir -p ./docs/examples/
cp -rf ./examples/* ./docs/examples/