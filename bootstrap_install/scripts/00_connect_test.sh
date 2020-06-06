#!/bin/bash

. hlos_test_common_vars.sh

echo
echo "# Test connection to HLOS"
echo "#################################################"
$CURL $host_url/
echo