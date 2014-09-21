test:
	@./node_modules/.bin/mocha -u tdd
.PHONY: test

build:
	browserify --standalone numbers ./lib/numbers.js -o ./src/numbers.js
	uglifyjs -o ./src/numbers.min.js ./src/numbers.js
