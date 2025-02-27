#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: $0 YOUR_DOMAIN_NAME";
  exit 1
fi

if !(type npm > /dev/null 2>&1); then
  echo "Please install \`node\` and \`npm\` command."
  exit 1
fi

# 0. bash configure
shopt -s dotglob
BASE_URL="https://astro.debiru.net"
DOMAIN_NAME="$1"

function apply_patch() {
  curl -fsSL "${BASE_URL}/build/patch/$1" | git apply --directory="v4.01" --allow-empty --quiet
}

function git_commit_if() {
  if [ "$(git status --short | wc -l)" = "1" ]; then
    git_commit_ifs "$1" "$2"
  fi
}

function git_commit_ifs() {
  if [ -n "$(git status --short | grep $1)" ]; then
    git add .
    git commit --quiet -m "$2"
  fi
}

# 1. Generate Astro Project
[ ! -e "astro.config.mjs" ] && npm create astro@latest project -- --template minimal --no-install --no-git
[ -d "project" ] && [ -n "$(ls -A project)" ] && mv project/* . && rm -r project
git_commit_ifs ".vscode" "npm create astro@latest"

# 2. Update .gitignore
apply_patch "gitignore.patch"
git_commit_if ".gitignore" "update .gitignore"

# 3. Generate deploy.yml
apply_patch "deploy.yml.patch"
git_commit_if ".github" "add .github/workflows/deploy.yml"

# 4. Remove src/* files
[ -d "src" ] && rm -r src
[ ! -e "src" ] && mkdir src
git_commit_ifs "src/" "remove default src files"

# 5. Update package.json
apply_patch "package.json.patch"
[ $(tail -n1 "package.json" | wc -l) = "0" ] && echo "" >> "package.json"
git_commit_if "package.json" "update package.json"

# 6. Prepare starter kit
apply_patch "starter-kit.patch"
perl -i -pe "s@site: '[^']+'@site: 'https://${DOMAIN_NAME}'@smg" astro.config.mjs
git_commit_ifs "public/favicon.ico" "generate starter kit"

# 7. Generate package-lock.json
npm install -D glob js-beautify sass stylelint stylelint-config-standard
git_commit_ifs "package-lock.json" "npm install"
