#!/bin/sh

if type -p podman > /dev/null; then
  # We're using podman, run rootless
  DOCKER="podman"
elif [[ $(groups | egrep -c "docker") -eq 1 ]]; then
  # We're in the docker group, don't need to sudo
  DOCKER="docker"
else
  # Probably going to need sudo after all
  DOCKER="sudo docker"
fi

${DOCKER} ${@}
