#!/bin/bash

cd $(dirname $0)/..

CSS_DIR="public/assets"
SCSS_DIR="public/assets"

find "${CSS_DIR}" -type f -name "*.css" | xargs rm
npx sass --no-source-map "${SCSS_DIR}:${CSS_DIR}"
