.DEFAULT_GOAL := test
## GENERAL ##

install:
	npm install

install-production:
	npm install --production

build:
	npm run build --if-present

run:
	firebase emulators:exec "npm run start:dev" --only firestore

lint:
	npm run lint

lint-check:
	npx eslint "{src,apps,libs,test}/**/*.ts"

format:
	npm run format

format-check:
	npx prettier --check "src/**/*.ts" "test/**/*.ts"

test-unit:
	npm run test

test-e2e:
	firebase emulators:exec "npm run test:e2e" --only firestore

.PHONY: test
test:
	@make format
	@make lint
	@make format-check
	@make lint-check
	@make test-unit
	@make test-e2e

help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'