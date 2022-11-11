#!/bin/bash

./docker.sh run -v $(pwd):/data:Z -d --name addPackage -it -w /data ruby bash
./docker.sh exec addPackage bundle update --bundler
./docker.sh exec addPackage bundle install
./docker.sh exec -it addPackage ./bin/addPkg.rb
./docker.sh stop addPackage
./docker.sh rm addPackage
