rm -r src/generated
rm -r src/lab2
rm -r src/calc

sh scripts/generate.sh

node --experimental-specifier-resolution=node dist/main.js
# tsc -w -p .