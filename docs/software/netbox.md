# Netbox

[Netbox](https://github.com/netbox-community/netbox) IP address management (IPAM) and data center infrastructure management (DCIM) tool.

## Access

It is available at [https://netbox.{{ domain }}/](https://netbox.{{ domain }}/) or [http://netbox.{{ domain }}/](http://netbox.{{ domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://netbox.{{ tor_domain }}/](http://netbox.{{ tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth set the service config to True
`settings/config.yml`

netbox:
  https_only: True
  auth: True