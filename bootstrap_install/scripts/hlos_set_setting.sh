#!/bin/bash

. config_secrets

echo
echo "# Run set_setting.sh on hlos"
echo "#################################################"
if [ -z $1 ]; then
  read -p 'Which setting: ';
  setting=${REPLY}
else
  setting=$1
fi

if [ -z $2 ]; then
  read -p 'Which value: ';
  value=${REPLY}
else
  value=$2
fi

echo $setting $value

n="set_setting#id@hlos"
m="shell" # or 'script', 'shell'
a="cd install && ./bootstrap_install/set_setting.sh $setting $value"
#a="ls -lart"
t="$host_ip"
s=`echo -n $n$m$t$key|sha256sum|cut -d' ' -f1`

command_post_data()
{
  cat <<EOF
{
  "n":"$n",
  "m":"$m",
  "a":"$a",
  "t":"$t",
  "s":"$s"
}
EOF
}

echo "$(command_post_data)"
$CURL --data "$(command_post_data)" -H "Content-Type: application/json" -X POST $host_url/command | json_pp
