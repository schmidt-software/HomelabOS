#!/bin/bash
zulip_container_id=$(docker ps | grep zulip/docker-zulip | awk '{print $1}')

docker exec -it $zulip_container_id bash -c "sudo -H -u zulip -g zulip /home/zulip/deployments/current/manage.py $@"
