#!/bin/bash

set -e

npm run clear 
#npm run lint
node ./scripts/info.js 

export NODE_ENV=dev 
webpack --display-error-details
export NODE_ENV=prod 
webpack --display-error-details

rm -rf ./docs/dist/
mkdir -p ./docs/dist/
cp -rf ./dist/* ./docs/dist/

rm -rf ./docs/examples/
mkdir -p ./docs/examples/
cp -rf ./examples/* ./docs/examples/