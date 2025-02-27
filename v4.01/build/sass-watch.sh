#!/bin/bash

cd $(dirname $0)/..

CSS_DIR="public/assets"
SCSS_DIR="public/assets"

npx sass --watch --no-source-map "${SCSS_DIR}:${CSS_DIR}"
