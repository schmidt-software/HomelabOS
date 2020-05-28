#!/bin/sh
## Setup the application configuration based on environment variable settings

generate_api_cfg()
{
cat <<EOF
[default]
host           = 0.0.0.0
port           = $API_PORT
sign_key       = $API_SIGN_KEY
sign_mode      = $API_SIGN_MODE
log_path       = $API_LOG_PATH
workers        = $API_WORKERS
timeout        = $API_TIMEOUT
ws_sub         = $API_WS_SUB
allow_ip       = $API_ALLOW_IP

[directory]
playbook       = $API_PLAYBOOK_PATH
script         = $API_SCRIPT_PATH
EOF
}

echo "$(generate_api_cfg)" > /ansible-api/data/api.cfg

generate_ansible_cfg()
{
cat <<EOF
[local]
localhost
$API_HOST
EOF
}

mkdir -p /etc/ansible /ansible
echo "$(generate_ansible_cfg)" > /etc/ansible/hosts

mkdir -p /playbooks
mkdir -p /scripts

echo "############################################################################"
echo "##  Starting Ansible API Service"
echo "############################################################################"

./bin/ansible-api -c data/api.cfg
