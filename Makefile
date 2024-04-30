.PHONY: logo decrypt build deploy docs_build restore develop lint docs_local count_services develop help

VERSION := $(cat VERSION)

deploy: logo build git_sync config ## Deploy HomelabOS - `make`
	@printf "\033[92m========== Deploying HomelabOS ==========\033[0m\n"
	./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" -i inventory playbook.homelabos.yml

config: logo build ## Update config files
# If config.yml does not exist, populate it with a 'blank'
# yml file so the first attempt at parsing it succeeds
	@printf "\033[92m========== Packaging configuration ==========\033[0m\n"
	@./docker_helper.sh homelabos package
	@printf "\033[92m========== Updating configuration files ==========\033[0m\n"
	@mkdir -p settings/passwords
	@[ -f ~/.homelabos_vault_pass ] || ./generate_ansible_pass.sh
	@[ -f settings/vault.yml ] || cp config.yml.blank settings/vault.yml
	@[ -f settings/additional_services_config.yml ] || cp config.yml.blank settings/additional_services_config.yml
	@[ -f settings/config.yml ] || cp config.yml.blank settings/config.yml
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" -i config_inventory playbook.config.yml
	@printf "\033[92m========== Encrypting secrets ==========\033[0m\n"
	@./docker_helper.sh ansible-vault encrypt settings/vault.yml || true
	@printf "\033[92m========== Done with configuration ==========\033[0m\n"

# Display the HomelabOS logo and MOTD
logo:
	@cat homelaboslogo.txt
	@chmod +x check_version.sh
	@$(eval VERSION=`cat VERSION`)
	@./check_version.sh
	@printf "MOTD:\n\n\033[92m" && curl -m 2 https://gitlab.com/NickBusey/HomelabOS/raw/master/MOTD || printf "Couldn't get MOTD"
	@printf "\n\n\033[0m\n"

build: ## Build the HomelabOS docker images
	@$(eval VERSION=`cat VERSION`)
	@printf "\033[92m========== Preparing HomelabOS docker image ==========\033[0m\n"
# First build the docker images needed to deploy
	@chmod +x docker_setup.sh
	@./docker_setup.sh
	@sudo docker pull nickbusey/homelabos:$(VERSION) || true
	@sudo docker inspect --type=image nickbusey/homelabos:$(VERSION) > /dev/null && printf "\033[92m========== Docker image already built ==========\033[0m\n" || sudo docker build . -t nickbusey/homelabos:$(VERSION)

rebuild: ## Rebuild the docker image from the Dockerfile
	@sudo docker build . -t nickbusey/homelabos:$(VERSION)

git_sync: ## Attempt to sync user settings to a git repo
	@./git_sync.sh || true

config_reset: logo build ## Reset all local settings
	@printf "\033[92m========== Reset local settings ==========\033[0m\n"
	@printf "\n - First we'll make a backup of your current settings in case you actually needed them.\n"
	mv settings settings.bak
	mkdir settings
	@printf "\n - Then we'll set up a blank config file.\n"
	cp config.yml.blank settings/config.yml
	@printf "\n\033[92m========== Configuration reset! Now just run 'make config' ==========\033[0m\n"

update: logo build git_sync config ## Update just HomelabOS Services (skipping slower initial setup steps)
	@printf "\033[92m========== Update HomelabOS ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" -i inventory -t deploy playbook.homelabos.yml
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" -i inventory playbook.restart.yml
	@printf "\033[92m========== Update completed! ==========\033[0m\n"

update_one: logo build git_sync config ## Update just one HomelabOS service `make update_one inventario`
	@printf "\033[92m========== Update $(filter-out $@,$(MAKECMDGOALS)) ==========\033[0m\n"
	@./docker_helper_notty.sh ansible-playbook --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" -i inventory -t deploy playbook.homelabos.yml
	@printf "\033[92m========== Restart $(filter-out $@,$(MAKECMDGOALS)) ==========\033[0m\n"
	@./docker_helper_notty.sh ansible-playbook --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" -i inventory playbook.restart.yml
	@printf "\033[92m========== Update completed! ==========\033[0m\n"

uninstall: logo build ## Remove all HomelabOS services
	@printf "\033[92m========== Uninstall HomelabOS completely ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" -i inventory -t deploy playbook.remove.yml
	@printf "\033[92m========== Uninstall completed! ==========\033[0m\n"

remove_one: logo build git_sync config ## Remove one service
	@printf "\033[92m========== Remove data for $(filter-out $@,$(MAKECMDGOALS)) ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' -i inventory playbook.remove.yml
	@printf "\033[92m========== Done removing $(filter-out $@,$(MAKECMDGOALS))! ==========\033[0m\n"

reset_one: logo build git_sync config ## Reset a single service's data files
	@printf "\033[92m========== Removing data for $(filter-out $@,$(MAKECMDGOALS)) ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' -i inventory playbook.stop.yml
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' -i inventory playbook.remove.yml
	@printf "\033[92m========== Redeploying $(filter-out $@,$(MAKECMDGOALS)) ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' -i inventory -t deploy playbook.homelabos.yml
	@printf "\033[92m========== Done resetting $(filter-out $@,$(MAKECMDGOALS))! ==========\033[0m\n"

tag: logo build git_sync config ## Run just items tagged with a specific tag `make tag tinc`
	@printf "\033[92m========== Running tasks tagged with '$(filter-out $@,$(MAKECMDGOALS))' ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" -i inventory -t $(filter-out $@,$(MAKECMDGOALS)) playbook.homelabos.yml
	@printf "\033[92m========== Done running tasks tagged with '$(filter-out $@,$(MAKECMDGOALS))'! ==========\033[0m\n"

restore: logo build git_sync config ## Restore a server with the most recent backup. Assuming Backups were running.
	@printf "\033[92m========== Restoring from backup ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" -i inventory restore.yml
	@printf "\033[92m========== Done restoring from backup! ==========\033[0m\n"

restart: logo build git_sync config ## Restart all enabled services
	@printf "\033[92m========== Restarting all services ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" -i inventory playbook.restart.yml
	@printf "\033[92m========== Done restarting all services! ==========\033[0m\n"

restart_one: logo build git_sync config ## Restart one service
	@printf "\033[92m========== Restarting '$(filter-out $@,$(MAKECMDGOALS))' ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' -i inventory playbook.restart.yml
	@printf "\033[92m========== Done restarting '$(filter-out $@,$(MAKECMDGOALS))'! ==========\033[0m\n"

stop: logo build git_sync config ## Stop all enabled services
	@printf "\033[92m========== Stopping all services ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" -i inventory playbook.stop.yml
	@printf "\033[92m========== Done stopping all services! ==========\033[0m\n"

stop_one: logo build git_sync config ## Stop one service
	@printf "\033[92m========== Stopping '$(filter-out $@,$(MAKECMDGOALS))' ==========\033[0m\n"
	@./docker_helper.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"]}' -i inventory playbook.stop.yml
	@printf "\033[92m========== Done stopping '$(filter-out $@,$(MAKECMDGOALS))'! ==========\033[0m\n"

terraform: logo build git_sync ## Spin up cloud servers with Terraform https://homelabos.com/docs/setup/terraform/
	@printf "\033[92m========== Deploying cloud server! ==========\033[0m\n"
	@[ -f settings/config.yml ] || cp config.yml.blank settings/config.yml
	@./terraform.sh
	@printf "\033[92m========== Done deploying cloud servers! Run 'make' ==========\033[0m\n"

terraform_destroy: logo build git_sync ## Destroy servers created by Terraform
	@printf "\033[92m========== Destroying cloud services! ==========\033[0m\n"
	@./docker_helper.sh /bin/bash -c "cd settings; terraform destroy"
	@printf "\033[92m========== Done destroying cloud services! ==========\033[0m\n"

decrypt: ## Decrypt vault file
	@printf "\033[92m========== Decrypting Ansible Vault! ==========\033[0m\n"
	@./docker_helper_notty.sh ansible-vault decrypt settings/vault.yml
	@printf "\033[92m========== Vault decrypted! settings/vault.yml ==========\033[0m\n"

encrypt: ## Encrypt vault file
	@./docker_helper_notty.sh ansible-vault encrypt settings/vault.yml

set: ## Set a setting value
	@printf "\033[92m========== Setting '$(filter-out $@,$(MAKECMDGOALS))' ==========\033[0m\n"
	@./set_setting.sh $(filter-out $@,$(MAKECMDGOALS))
	@printf "\033[92m========== Done! ==========\033[0m\n"

get: ## Print a setting value
	@printf "\033[92m========== Getting '$(filter-out $@,$(MAKECMDGOALS))' ==========\033[0m\n"
	@./get_setting.sh $(filter-out $@,$(MAKECMDGOALS))
	@printf "\033[92m========== Done! ==========\033[0m\n"

# From: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

###
# Dev section
#
# These are for developers working on HomelabOS itself, and can be ignored by users
###

# Run sanity and deployment tests on all HomelabOS services.
test:
	@go run main.go test

test_one:
	@./docker_helper_notty.sh ansible-playbook --extra-vars="@settings/config.yml" --extra-vars="@settings/additional_services_config.yml" --extra-vars="@settings/vault.yml" --extra-vars='{"services":["$(filter-out $@,$(MAKECMDGOALS))"],"$(filter-out $@,$(MAKECMDGOALS))":{"enable":"true"}}' -i inventory -t deploy playbook.homelabos.yml

# Return the amount of services included in this version of HomelabOS
count_services:
# This lists each folder in roles/ on it's own line, then excludes anything with homelabos or 'docs' in it, which are HomelabOS things and not services. Then it counts the number of lines.
	@ls -l roles | grep -v -e "homelab" -e "docs" | wc -l

# Run sanity checks on services
develop:
	@docker run -w /usr/src/app -v ${PWD}:/usr/src/app:Z golang go run main.go

# Serve the HomelabOS website locally
web:
	cd website && hugo serve

# Run linting scripts
lint:
	@printf "\033[92m========== Running Lint on Yaml ==========\033[0m\n"
	@./lint.sh

# Spin up a development stack
vagrant: logo build config
	@printf "\033[92m========== Spinning up dev stack ==========\033[0m\n"
	@[ -f settings/test_config.yml ] || cp settings/config.yml settings/test_config.yml
	@vagrant up --provision
	@printf "\033[92m========== Done spinning up dev stack! ==========\033[0m\n"

# Serve the HomelabOS Documentation locally
docs_local:
	@docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material

# Build the HomelabOs Documentation - Requires mkdocs with the Material Theme
docs_build: logo build git_sync config
	@printf "\033[92m========== Building docs ==========\033[0m\n"
	@which mkdocs && mkdocs build || printf "Unable to build the documentation. Please install mkdocs."
	@printf "\033[92m========== Done building docs ==========\033[0m\n"

# Hacky fix to allow make to accept multiple arguments
%:
	@:
