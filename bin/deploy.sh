#!/bin/bash

echo "building"
npm run build

echo "deleting branch locally if it exists"
git branch -D gh-pages

git checkout -b gh-pages &&
rm -rf static/ &&
mv ./build/* ./ &&
git add . &&
git commit -m "deploy" &&
git push origin gh-pages:gh-pages -f &&
git checkout master
