# How to Add Services to HomelabOS

## Using the addPkg.rb script

Included in the bin directory is a ruby script called addPkg.rb that automates most of the work for adding a new service or package.

### Caveat Emptor

The script requires a functional installation of Ruby 2.2+ and installation of the Psych gem (for parsing and writing YML files)

### Usage.

1. From the project root directory call:
   `bin/addPkg.rb'
2. Answer the questions
3. Edit the docker compose file under `roles/your_package_name/templates` directory
4. Test!
5. Push your branch as a MR.

## Adding a package manually

## Create Role Folder

Copy an existing role folder like 'inventario' from the `roles/` folder,
then adapt the values as needed.

### Use hardcoded volume paths

All mounted docker volumes should point to a folder named after the service that is using it, and located under `/var/homelabos`.

## Add Service to Documentation

### Create a Documentation Page

Each service should have it's own page within the `docs/software/` folder.
Use existing docs as a template.

### Link to Documentation Page

Update the `mkdocs.yml` file with a reference to the newly created doc file.

## Add Service to Inventory File

The service needs to be added to 3 places within
`group_vars/all`.

First under the `# Enabled List` section.
All services here should default to `False`.
Next under the `enabled_services:` section in alphabetical order.
Finally under the `services:` section.

## Add Service to README

The service should be added under the list of `Available Software`.

## Add Service to `config.yml.j2`

In the config template `roles/homelabos_config/templates/config.yml.j2` the
service should be added in alphabetical order under the `# Services List` section.

# How to Debug a New Service

After a new service has been deployed, run `systemctl status SERVICE_NAME` to see
how it's doing.

If it's not running with an error like `(code=exited, status=1/FAILURE)`

Grab the value of the ExecStart line, and run it by hand. So if the ExecStart line looks like:
`ExecStart=/usr/bin/docker-compose -f /var/homelabos/zulip/docker-compose.zulip.yml -p zulip up`
then manually run the bit after the =, `/usr/bin/docker-compose -f /var/homelabos/zulip/docker-compose.zulip.yml -p zulip up` to see the error output directly.
