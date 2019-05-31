build: publish install
install:
	npm link
start:
	npx babel-node src/bin/gendiff.js
publish:
	npm publish --dry-ru
lint:
	npx eslint .