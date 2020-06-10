#!/usr/bin/env bash

# Checks to make sure the current environment is setup correctly
Task::sanity_check(){
  if [[ -v "already_ran[${FUNCNAME[0]}]" ]] ;  then exit 0; fi
  already_ran[${FUNCNAME[0]}]=1

  Task::check_vault_pass
  Task::check_ssh_keys

  colorize green "Sanity checks passed"
}

Task::check_vault_pass(){
  if [[ -v "already_ran[${FUNCNAME[0]}]" ]] ;  then exit 0; fi
  already_ran[${FUNCNAME[0]}]=1

  if [ ! -f "$HOME/.homelabos_vault_pass" ]; then
    echo "Oops, I cannot find your vault password in $HOME/.homelabos_vault_pass"
    echo "This is unusual, but could be caused by the user being changed during setup."
    colorize red "FIX: Create the file in the right place.  Then file a bug report."
    exit 1
  fi
}

Task::check_ssh_keys() {
  if ! [ -f "$HOME/.ssh/id_rsa" -a -f "$HOME/.ssh/id_rsa.pub" -a -f "$HOME/.homelabos_vault_pass" ]; then
    echo "You have no SSH keys in your home directory: $HOME"
    echo "Please generate a set of keys using the command:"
    echo "   ssh-keygen -t rsa"
    echo "or copy your id_rsa and id_rsa.pub keys to $HOME/.ssh/"
    echo "Then retry the operation"
    read -p "Press ctrl-c and fix your ssh keys"
    exit 1
  fi
}

# It would be nice to verify passwordless ssh to the server works.