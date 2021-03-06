.DEFAULT_GOAL := test
## GENERAL ##

install:
	npm install

install-production:
	npm install --production

run:
	npm run console:dev

run-prod:
	npm run console:prod

build:
	npm run build --if-present

lint:
	npm run lint

lint-fix:
	npm run lint-fix

format:
	npm run format

format-fix:
	npm run format-fix

test-unit-cov:
	npm run test

commit:
	npm run commit

test-e2e:
	npm run test:e2e
	@#docker run -it -w /app -v $(PWD)/ddd-commander:/app node:14.16.1-stretch npm run test:e2e

cp-snapshot:
	@cp -rp ${PWD}/../node-demo-my-project/src/ ${PWD}/snapshot
	@cp -rp ${PWD}/../node-demo-my-project/test/ ${PWD}/snapshot

.PHONY: test
code:
	@make format-fix
	@make lint-fix
	@make format
	@make lint

.PHONY: test
test:
	@make code
	@make test-unit-cov
	@make test-e2e

tools:
	@make format-fix
	@make lint-fix

help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'