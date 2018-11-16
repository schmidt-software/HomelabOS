# Tinc

HomelabOS can optionally use Tinc to configure a cloud based bastion server, which will route
to your HomelabOS instance without needing to forward ports on your home router.

This is desirable for three reasons.

1. Less configuration - No need to configure your routers or firewalls, no port forwarding to mess with.
2. Enhanced security - Your home IP address will not be exposed to the internet via DNS
3. Email - Most ISPs block the ports necessary for email, this circumvents that

## Setup

Edit the `host_vars/tincserver` file with your server's IP and ssh username.

This user should have passwordless SSH and Sudo just like the HomelabOS server.

Now run `make update` as normal, and HomelabOS will take care of everything else.

Now point your domain name to your cloud server's IP address, and everything should be happy!

A domain configured with a `A` type DNS record of `*.yourdomain.com` pointed at your server's IP address. (This is optional because you can use Tor to access your services without registering a domain. For best support from 3rd party clients an actual domain is highly recommended. Also certain services do not work through TOR at the moment.) Note you can hang this off a subdomain as well, so `*.homelab.yourdomain.com` will work as well.