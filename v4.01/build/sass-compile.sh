#!/bin/bash

cd $(dirname $0)/..

CSS_DIR="public/assets/css"
SCSS_DIR="public/assets/scss"

rm -r "${CSS_DIR}"
npx sass --no-source-map "${SCSS_DIR}:${CSS_DIR}"
