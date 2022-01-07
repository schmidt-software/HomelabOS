#!/bin/bash

# If the user is root, end the script.
if [ "$(id -u)" == "0" ]; then
    exit 1
fi

# If user is not root, check if the user has a group named "docker".
if [ $(id -Gn | grep -c "docker") -eq 0 ]; then
    echo "You need to be in the docker group to run this script."
    # Ask the user if they want to add the user to the docker group.
    read -p "Do you want to add yourself to the docker group? [y/n] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Add the user to the docker group.
        sudo usermod -aG docker $USER
    fi
fi