#!/bin/bash

npm run build &&
git branch -D gh-pages &&
git checkout gh-pages &&
rm -rf static/ &&
mv ./build/* ./ &&
git add . &&
git commit -m "deploy" &&
git push origin gh-pages:gh-pages &&
git checkout master
