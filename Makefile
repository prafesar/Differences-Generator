install: install-deps

start:
	npx babel-node 'src/bin/gendiff.js' 10

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish --dry-ru

.PHONY: test