#!/bin/bash

npm run build
git branch -D gh-pages
git checkout gh-pages
rm -rf static/
mv ./build/* ./
