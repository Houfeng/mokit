#!/bin/bash

set -e

nokit stop && nokit start --name mokit --public ./ --port 8002