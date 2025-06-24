install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -- --watch

coverage:
	npm test -- --coverage --coverageProvider=v8