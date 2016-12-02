#!/bin/bash

set -e

nokit stop && nokit start --name mokit --config server -e local