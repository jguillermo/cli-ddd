.DEFAULT_GOAL := help
## GENERAL ##

install:
	npm install

install-production:
	npm install --production

run:
	npm run console:dev

run-prod:
	npm run console

build:
	npm run build --if-present

lint:
	npm run lint

format:
	npm run format

format-check:
	npm run format-check

test-unit:
	npm run test

test-e2e:
	npm run test:e2e
	@#docker run -it -w /app -v $(PWD)/ddd-commander:/app node:14.16.1-stretch npm run test:e2e

.PHONY: test
test:
	#npm --prefix "ddd-cli" run test:cov
	@make format
	@make format-check
	@make test-unit
	@make test-e2e
	@make lint


help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'