# Setup for HomeLabOS
To deploy HLOS to a remote server, you must run the setup_hlos-sh script.

This script will instruct you how to get setup.
In short, you will be asked to provide the IP-address, user name and password for your server.
The server is assumed to have a running ssh service and allow you to loginof-course.

The script will install a few tools in a virtual Python environment, and use Ansible to deploy HLOS to the server.

NOTE: This is work in progress, so you may have to install some dependencies on the client PC not discovered during development.
Please let us know if you find such dependencies, so they can be added to the setup script.

