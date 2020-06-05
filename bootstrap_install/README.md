# Setup for HomeLabOS
To deploy HLOS to a remote server, you must run the setup_hlos.sh script.

This script will instruct you how to get setup.
In short, you will be asked to provide the IP-address, user name and password for your server.
The server is assumed to have a running ssh service and allow you to login and perform sudo of-course.

The script will install a few tools in a virtual Python environment, and use Ansible to deploy HLOS to the server.

NOTE: This is work in progress, so you may have to install some dependencies on the client PC not discovered during development.
Please let us know if you find such dependencies, so they can be added to the setup script.

# Files of special interest:
* roles/homelabos_ansible_api
    * This directory contains the ansible files needed to deply the ansible-api service container
    * This container provides ansible as well as a REST-like interface to run playbooks via http-requests
* roles/homelabos_web
    * This playbook will setup the HomeLabOS web interface service container.
    * The service provides a web-interface to the ansible-api service
* roles/homelabos_api_deploy
    * This playbook is a parallel implementation to the one used by the Makefile to deploy Traefik.
    * It also creates the hlos-user
    * It also bootstraps the server with on-server dependency install (docker and so on)
    * It is stripped down to only this function, and does not need to run more than once.
* roles/homelabos_api_deploy_service
    * This playbook will setup and run a service.  It is a parallel implementation to the one used by the Makefile currently.
    * It is stripped down to just the essentials for this specific function.
