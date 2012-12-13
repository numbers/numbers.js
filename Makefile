test:
	@./node_modules/.bin/mocha -u tdd
.PHONY: test

build:
	browserify ./lib/numbers.js -o ./public/numbers.js
	uglifyjs -o ./public/numbers.js ./public/numbers.min.js