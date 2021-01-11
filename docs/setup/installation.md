# Installation

!!! Warning "Beta Software Warning"

    This software has not reached version 1.0 and should therefore be considered unstable. While any tagged version should work well on its own, a nice friendly upgrade path from one version to another is not guaranteed.

    If you like getting your hands dirty in early versions of software, this is for you. If you prefer to wait till things are stable and friendly, maybe hold off for a while.

    Also, if you trash your server or wreck your data, that's on you. Test your backups. Trust nothing.

## Requirements

### Server

- Ubuntu Server 20.04 or Debian 10.3
- `sudo` must be available
- [Passwordless SSH via SSH keys](https://linuxconfig.org/passwordless-ssh) working.

!!! Warning
    If you are running on an ARM infrastructure such as Raspberry PI, set `arm` to true. Run: `hlos set arm True`

## Optional Items

### Client Computer

* Docker installed and working.

!!! Note
    Two separate computers are not required, but are highly recommended. The idea is you have a server and then your personal computer, say a laptop or desktop. You deploy from your personal computer to the server. This way your settings are saved on your personal computer, and can be used to re-build the server and restore from backups if anything goes wrong.

!!! Warning
    If you do install HomelabOS directly on the server and deploy from there, make sure to back up your `settings/` folder from the server to somewhere safe, otherwise you could lose your settings.

### Domain Name

A domain configured with a `A` type DNS record of `*.yourdomain.com` pointed at your server's IP address. You can also use a subdomain as well, so `*.homelab.yourdomain.com` would work.

!!! Note
    This is optional because you can use Tor to access your services without registering a domain. For best support from 3rd party clients an actual domain is highly recommended. Also certain services do not work through TOR at the moment.

!!! Note
    It's easiest to have an actual domain to point at your services, but you can `fake` it by adding DNS overrides to your `/etc/hosts` file on *nix and MacOS if needed or for testing.

#### DNS Settings

You need to point your `{{ domain }}`, as well as `*.{{ domain }}` to the IP address your HomelabOS install is accessible at. If you are using a [bastion](/docs/setup/bastion) host, then you would point at that IP. If you are using your home IP address, you would point it at that IP. You need to set up a wildcard DNS entry because all the services are served off of subdomains such as `{% if emby.domain %}{{ emby.domain }}{% else %}{{ emby.subdomain + "." + domain }}{% endif %}`

!!! Warning
    If you are not using a real domain, but using `/etc/hosts` entries to 'fake' it, wildcard entries do not work in `/etc/hosts`. You need to create an entry for each service enabled. You can use the `/var/homelabos/homelab_hosts` file.

#### Changing your domain

If you need to change your domain (or subdomain) simply run `hlos set domain new.domain.com` then run `hlos deploy` again.

### Port Forwarding

Ports 80 and 443 punched through any firewalls and port forwarded at your server in question.

!!! Note
    This is optional because if you are using the [bastion](bastion.md) server or [TOR access](tor.md), you do not need to deal with port forwarding or firewalls.

### [Cloud Bastion Server](bastion.md)

Rather than pointing the domain at your home IP and having to manage DDNS, you can utilize a cloud server
to act as a bastion host via Tinc vpn and nginx.

### S3 Account

S3 is Amazon's Simple Storage Service which HomelabOS can optionally use to back up to. You can use Amazon's service, or one of many other S3 compatible providers. You can also back up to another HomelabOS instance if that other instance is running Minio, a self-hosted S3 service.

## Installation

[Video Installation Tutorial](https://youtu.be/lbmViEFTj4o)

### Automatic Set-up (One-liner)

* On your server run: `bash <(curl -s https://gitlab.com/NickBusey/HomelabOS/-/raw/master/install_homelabos.sh)`

* Make sure to back up your `{{ volumes_root }}/install` directory nightly.

#### But isn't piping bash to curl insecure?

Not really. If you're using https (we are), then you can be sure you're getting the file you expect.

This is also the recommended installation method of:

* [Rust](https://www.rust-lang.org/tools/install)
* [homebrew](https://brew.sh/)
* [RVM](https://rvm.io/rvm/install).
* [Docker](https://get.docker.com/)
* [DockSTARTer](https://dockstarter.com/)

It's pretty standard practice at this point.

If you still don't trust it, great, you'll fit right in here. Proceed to the Manual Set-up step below.

### Manual Set-up

* Download the [latest version](https://gitlab.com/NickBusey/HomelabOS/-/releases) to your client computer and extract the folder. From inside the folder run `./hlos install_cli` now you can run `hlos` directly. Otherwise just append `./` to the `hlos` commands listed below.

!!! Note
    If you are using HomelabOS to provision a [bastion](bastion.md) server, run: `$ hlos terraform`

* From inside the HomelabOS folder, set up the initial config: `hlos config`

!!! Note
    You will be prompted for the basic information to get started. The passwords entered here will be stored on the client computer and are used by ansible to configure your server. After you enter the information, HomelabOS will configure your local docker images and build your initial `settings/` files.

* Once you have updated your settings simply deploy HomelabOS with `hlos deploy`. You can run `hlos deploy` as many times as needed to get your settings correct.

You can check http://{{ homelab_ip }}:8181 in a browser to see the Traefik dashboard.

See a full list of commands in the [Getting Started Section](/docs/setup/gettingstarted)

## Enabling Services

Run `hlos set SERVICENAME.enable true` where SERVICENAME is the name of the service you want to enable.

!!! example
    `hlos set miniflux.enable true`

Then run `hlos deploy` again. That's it. It will take a few minutes for your server to download and start the relevant images.


!!! warning
    Some services expose set up pages on start up. If you don't complete the set up step, there is a chance someone else could beat you to it. If they do just run `hlos reset_one SERVICENAME` then `hlos deploy` again and the service will reset to it's freshly installed state.

You can SSH into the server, and run `systemctl status SERVICENAME` where SERVICENAME is the name of the server you want to check  is running. It will show you status and/or errors of the service.

!!! example
    `systemctl status miniflux`

## Syncing Settings via Git

HomelabOS will automatically keep the `settings/` folder in sync with a git repo if it has one.
So you can create a private repo on your Gitea instance for example, then clone that repo over the
settings folder. Now any changes you make to `settings/` files will be commited and pushed to that git
repo whenever you run `hlos deploy`, `hlos update` or `hlos config`.

## Backing up your Vault Password

!!! danger
    This bit is important.

If you installed with the Automatic/One-Liner install, your vault password exists at `~/.homelabos_vault_pass` for the user you ran the script as. Make sure to back this password up somewhere safe, and ideally _not_ in your `settings/` folder. If someone gains access to your `settings/` folder and the vault password, bad things can happen. Store them separately.

## [Troubleshooting / FAQ](faq.md)

## Network Configuration

It is recommended to register an actual domain to point at your Homelab, but if you can't or would prefer not to, you can use HomelabOS fully inside your network. Simply make up a domain that ends in `.local` and enter that as your domain in `host_vars/myserver`.

When HomelabOS `hlos deploy` command completes, it creates a file on the server at `{{ volumes_root }}/homelabos_hosts`. You can take the contents of this file and create local DNS overrides using it. All your requests should complete as expected.

## NAS Network Attached Storage Configuration

Different HomelabOS services operate on libraries of media (Airsonic, Plex, and Piwigo as examples). Since these libraries can be large, it makes sense to keep them on another machine with lots of storage.

NAS shares are mounted on the HomelabOS host under `{{ storage_dir }}`, which defaults to `/mnt/nas`. By default, NAS is disabled, and the services that can use it will instead use local folders under `{{ storage_dir }}`.

For example, [Emby](/software/emby) will map `{{ storage_dir }}/Video/TV` and `{{ storage_dir }}/Video/Movies` into its container, and [Paperless](/software/paperless) will mount `{{ storage_dir }}/Documents`. Check the `docker-compose` files for each service to see what directories are used.

To configure your NAS, edit the `# NAS Config` section of `settings/config.yml`.

1. Enable NAS by setting `nas_enable: True`
2. Set `nas_host` to the hostname, FQDN, or IP address of your NAS.
3. Choose your network share type (`nfs` or `smb`) and set `nas_share_type` to that value.
4. Set your `nas_share_path`, if applicable. SMB shares will probably not have a value for this, but NFS will.
5. If authenticating to access SMB shares, set your username and password in `nas_user` and `nas_path`.
6. Set your Windows domain in `nas_workgroup`, if applicable.

Re-run `hlos deploy` to configure and enable your NAS.

??? example "Example [unRAID](https://unraid.net) configuration"
    ```
    nas_enable: True
    nas_host: unraid.mydomain.com
    nas_mount_type: nfs
    nas_share_path: /mnt/user
    nas_user:
    nas_pass:
    nas_workgroup:
    ```

??? example "Example SMB configuration"
    ```
    nas_enable: True
    nas_host: 192.168.1.12
    nas_mount_type: smb
    nas_share_path: homelab
    nas_user: user
    nas_pass: 12345
    nas_workgroup: WORKGROUP
    ```

## Local Storage Configuration

!!! warning
    There's ample opportunity to nuke essential data with the guide below, so please make sure you're aware of the changes you are making. Use with caution!

As described above, different HomelabOS services operate on libraries of media and in your situation you may wish to store these on a large local disk.
This guide describes how to achieve that with logical volume groups. In the example below we assume a fresh install of Ubuntu 20.04 with a large local disk residing on `/dev/sdb1`.
We describe how to create two volumes from the large local disk (in our case 3TB) , one for local docker image and container volume storage and the other for local media storage.
Note - we assume docker hasn't been installed yet for this scenario.

1. Use gparted to format the entire disk, in our case `/dev/sdb` as `lvm2-pv` (logical volume manager physical volume).
2. Create volume group `vg-hdd` and within it, create two logical volumes, `lv-homelab-data` and `lv-docker-data`
```
user@homelab:~$ sudo lvm
lvm> vgcreate vg-hdd /dev/sdb1
  Volume group "vg-hdd" successfully created
lvm> lvcreate -l 50%FREE -n lv-homelab-data vg-hdd
  Logical volume "lv-homelab-data" created.
lvm> lvcreate -l 50%FREE -n lv-docker-data vg-hdd
  Logical volume "lv-docker-data" created.
```
3. Confirm logical volumes have been created 
```
lvm> lvs
  LV              VG            Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv-docker-data  vg-hdd        -wi-a----- <698.63g                                                    
  lv-homelab-data vg-hdd        -wi-a-----    1.36t                                                    
  root            vgubuntu-mate -wi-ao---- <110.33g                                                    
  swap_1          vgubuntu-mate -wi-ao----  980.00m                                                    
lvm> pvs
  PV         VG            Fmt  Attr PSize    PFree   
  /dev/sda5  vgubuntu-mate lvm2 a--  <111.29g       0 
  /dev/sdb1  vg-hdd        lvm2 a--    <2.73t <698.63g
```
4. Format the new logical volumes as `ext4` partitions
```
user@homelab:~$ sudo mkfs -t ext4 /dev/vg-hdd/lv-docker-data
[sudo] password for user: 
mke2fs 1.45.5 (07-Jan-2020)
Creating filesystem with 183141376 4k blocks and 45793280 inodes
Filesystem UUID: c643b378-bb6a-4fcd-bd1d-92ff2583c901
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968, 
	102400000

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (262144 blocks): done
Writing superblocks and filesystem accounting information: done     

user@homelab:~$ sudo mkfs -t ext4 /dev/vg-hdd/lv-homelab-data
mke2fs 1.45.5 (07-Jan-2020)
Creating filesystem with 366282752 4k blocks and 91578368 inodes
Filesystem UUID: 97872479-4e94-425f-b36f-bb1c37fc09d5
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968, 
	102400000, 214990848

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (262144 blocks): done
Writing superblocks and filesystem accounting information: done
```
5. Make directories for the new partitions to be mounted to and mount them 
```
user@homelab:~$ sudo mkdir /mnt/homelabos-data
user@homelab:~$ sudo mount -t ext4 /dev/vg-hdd/lv-homelab-data /mnt/homelabos-data/
user@homelab:~$ sudo mkdir /mnt/docker-data
user@homelab:~$ sudo mount -t ext4 /dev/vg-hdd/lv-docker-data /mnt/docker-data/
```
6. Confirm filesystem layout
```
user@homelab:~$ df -h
Filesystem                             Size  Used Avail Use% Mounted on
udev                                   5.9G     0  5.9G   0% /dev
tmpfs                                  1.2G  1.9M  1.2G   1% /run
/dev/mapper/vgubuntu--mate-root        109G  6.2G   97G   6% /
tmpfs                                  5.9G   47M  5.9G   1% /dev/shm
tmpfs                                  5.0M  4.0K  5.0M   1% /run/lock
tmpfs                                  5.9G     0  5.9G   0% /sys/fs/cgroup
/dev/sda1                              511M  4.0K  511M   1% /boot/efi
/dev/loop0                              28M   28M     0 100% /snap/snapd/7264
tmpfs                                  1.2G   60K  1.2G   1% /run/user/1000
/dev/loop1                              55M   55M     0 100% /snap/core18/1705
/dev/loop2                             128K  128K     0 100% /snap/software-boutique/54
/dev/loop3                              15M   15M     0 100% /snap/ubuntu-mate-welcome/524
/dev/mapper/vg--hdd-lv--homelab--data  1.4T   77M  1.3T   1% /mnt/homelab-data
/dev/mapper/vg--hdd-lv--docker--data   687G   73M  652G   1% /mnt/docker-data
```
7. Map the docker storage folder to our newly created and mounted lv via symbolic link
```
user@homelab:/mnt/docker-data$ sudo ln -s /mnt/docker-data/docker/ /var/lib/docker
```
8. Install docker as usual continue with your installation of HomelabOS