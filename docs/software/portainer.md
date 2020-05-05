# Portainer

[Portainer](https://www.portainer.io/) is a Docker management interface, for the more advanced user.
Check it out at [Portainer.io](https://www.portainer.io/)

## Setup

To enable Portainer; run **`make set portainer.enable true`**, then run **`make update`** to update HomelabOS

## Access

By default, Inventario will be available at either:
[https://portainer.{{ domain }}/](https://portainer.{{ domain }}/)
[http://portainer.{{ domain }}/](http://portainer.{{ domain }}/)

{% if enable_tor %}
Portainer is available via Tor at [http://portainer.{{ tor_domain }}/](http://portainer.{{ tor_domain }}/)
{% endif %}
