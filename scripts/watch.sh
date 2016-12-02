#!/bin/bash

set -e

npm run clear 
#npm run lint
node ./scripts/info.js 
export NODE_ENV=dev 
webpack --display-error-details --watch