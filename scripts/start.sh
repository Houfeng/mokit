#!/bin/bash

set -e

nokit stop && nokit start --public ./ --port 8002