#!/bin/bash

. config_secrets

echo
echo "# HLOS deploy service (instead of using Makefile)"
echo "#################################################"
hlos="/playbooks"
n="deploy#id@hlos"
h="$host_ip"
f="playbook.homelabos_api.yml"
e="$hlos/settings/config.yml"

playbook_post_data()
{
  s=`echo -n $n$h$f$key|sha256sum|cut -d' ' -f1`
  cat <<EOF
{
  "n":"$n",
  "h":"$h",
  "f":"$f",
  "s":"$s",
  "e":"$e",
  "c_cmd1":"-e \"@$hlos/settings/vault.yml\"",
  "c_cmd2":"--tags deploy_service"
}
EOF
}

echo "$(playbook_post_data)"
$CURL --data "$(playbook_post_data)" -H "Content-Type: application/json" -X POST $host_url/playbook | json_pp
