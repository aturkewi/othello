#!/bin/bash

npm run build
git branch -D gh-pages
git checkout gh-pages
cp -r ./build ./
