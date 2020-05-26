#!/bin/bash
echo "#####################################################################################################"
echo "## This script can be used both from a client machine, and on the server to which you want to deploy HLOS"
echo "## We expect the server to be Debian or Ubuntu based"
echo "##    (apt, not yum, dnf, emerge, pkg, packman, sqg, swupd)"
echo "##"
echo "## The script bootstraps the server, preparing it for setup and deployment of services."
echo "## Your client computer needs to have a few things installed, so make sure your current user has sudo access"
echo "## If not, login as root and install sudo, then add your user to the sudoers group.  Logout and login again."
echo "## You only have to do this step once."
echo "##"
echo "## You also need to have access to the server, and be able to use sudo there. Check this before continuing"
echo "## by ssh user@youserver.org . You should get a shell without typing your password."
echo "##"
echo "## Once logged in on the server try 'sudo ls'.  If this is fine, you are good to go."
echo "## If sudo does not work, su to root and add your user to /etc/group -> sudo line."
echo "##"
echo "##"
echo "## Press ctrl-c if you do not have sudo access with your user. Otherwise press <enter> to continue"
read

echo
echo "* First a few questions, then we are off."
echo "* Enter your server IP and credentials.  Then we can get your ssh keys on the server."
read -p "Enter your server IP-address: " ip
read -p "Enter your server username: " user
read -s -p "Enter your server password: " pass

# Install ansible, sshpass to get started
echo
echo "* I need sshpass and Python, you may be asked to enter your sudo credentials (for this machine):"
sudo apt update
sudo apt install -qy sshpass python3 python3-pip

if [ ! -f "ansible/bin/ansible" ]; then
  echo "* Installing ansible in a Python virtual environment.  This means you can delete it after bootstrapping the server"
  echo "* if you want, and no changes were made on your client PC."
  pip3 install virtualenv
  python3 -m virtualenv ansible
  cd ansible
  source bin/activate
  pip3 install ansible docker-py
else
  cd ansible
  source bin/activate
fi

if [ ! -f "$HOME/.homelabos_vault_pass" ]; then
  echo "* Create Ansible vault password in $HOME/.homelabos_vault_pass"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    function sha256sum() { shasum -a 256 "$@" ; } && export -f sha256sum
  fi
  date +%s | sha256sum | base64 | head -c 32  > $HOME/.homelabos_vault_pass
else
  echo "* Using Ansible vault password in $HOME/.homelabos_vault_pass"
fi

if [ -f "$HOME/.ssh/id_rsa" -a -f "$HOME/.ssh/id_rsa.pub" ]; then
    echo "* Found your SSH key in $HOME/.ssh/{id_rsa, id_rsa.pub}"
else
    echo "* You have no SSH keys in your home directory: $HOME"
    echo "* If you think this is an error, please copy your key to $HOME/.ssh/id_rsa and id_rsa.pub"
    read -p "Press ctrl-c and fix your ssh keys, or <enter> to generate a new key."
    echo "* Generating a set of keys."
    echo "* Do not use a passphrase, and save the file in $HOME/.ssh/id_rsa"
    ssh-keygen -t rsa
fi

# Create certificates folder and copy SSH public key
mkdir -p certificates
cp $HOME/.ssh/id_rsa.pub certificates

generate_ansible_cfg()
{
cat <<EOF
[defaults]
host_key_checking=false
EOF
}
echo "$(generate_ansible_cfg)" > ansible.cfg

if [ ! -f "$HOME/.homelabos_hlos_password" ]; then
  echo "* Generating a password for the 'hlos' user. It is stored in $HOME/.homelabos_hlos_password"
  echo "* Ignore the warning about ignoring null character - it is all okay."
  hlospass=`shuf -zer -n32  {A..Z} {a..z} {0..9}`
  salt=`shuf -zer -n16  {A..Z} {a..z} {0..9}`
  playbookpass=`echo -e $hlospass|mkpasswd -s --method=SHA-512 -S $salt`
  echo "$hlospass $playbookpass" > $HOME/.homelabos_hlos_password
else
  echo "* Using password stored in $HOME/.homelabos_hlos_password for the 'hlos' user"
  playbookpass=`cat $HOME/.homelabos_hlos_password|cut -d' ' -f2`
fi

# Secure the inventory, then put stuff in it.
touch inventory
chmod 600 inventory

generate_inventory_file()
{
cat <<EOF
[remotenode]
$ip

[all:vars]
ansible_connection=ssh
ansible_ssh_user=$user
ansible_ssh_pass=$pass
ansible_become=true
ansible_become_pass="{{ ansible_ssh_pass }}"
user_name=hlos
user_pass="$playbookpass"
volumes_root="/home/{{ user_name }}"
EOF
}
echo "$(generate_inventory_file)" > inventory

echo
echo "* Trying to contact your server using the credentials given"
ansible -m ping -i inventory remotenode
read -p "Did this succeed? Press <enter> if it did, otherwise <ctrl-c> and investigate. Maybe a mistyped password?"

cp -R ../playbook/* .
cp -R ../docker .

echo "* Now running the ansible playbook to get the hlos user setup"
ansible-playbook  -i inventory playbook.bootstrap.yml

echo "* Finally test the hlos user is setup correctly.  You should see the message 'All is okay'..."
ssh hlos@$ip echo "All is okay at \$HOME"

echo "* Test the ansible-api service is running.  You should see a message coming back.  Pause for a few seconds to let the service start up."
sleep 10
wget -q -O - http://$ip:8765/
echo

echo "* Everything should be in working order now.  Please visit the HLOS Web service at http://$ip:8888 and continue to setup the system from there."
echo
echo "* You can run this script multiple times in case something did not go as expected. Also feel free to delete everything from this machine."
