DEV = docker compose -f docker-compose.dev.yaml
STAGING = docker compose -f docker-compose.staging.yaml


.PHONY: rebuild build up down restart logs ps clean stage-rebuild stage-build stage-up stage-down stage-restart stage-logs stage-ps stage-clean

rebuild:
	$(DEV) up -d --build

up:
	$(DEV) up -d

down:
	$(DEV) down

restart:
	$(DEV) down
	$(DEV) up -d --build

logs:
	$(DEV) logs -f --tail=200

ps:
	$(DEV) ps

build:
	$(DEV) build

clean:
	$(DEV) down -v



stage-rebuild:
	$(STAGING) up -d --build

stage-up:
	$(STAGING) up -d

stage-down:
	$(STAGING) down

stage-restart:
	$(STAGING) down
	$(STAGING) up -d --build

stage-logs:
	$(STAGING) logs -f --tail=200

stage-ps:
	$(STAGING) ps

stage-build:
	$(STAGING) build

stage-clean:
	$(STAGING) down -v