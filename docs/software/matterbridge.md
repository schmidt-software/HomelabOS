# matterbridge

[matterbridge](https://github.com/42wim/matterbridge) A program that allows users to link multiple chat platforms.

## Access

Edit the matterbridge.toml file according to the instructions at:
[![Matterbridge how-to](https://github.com/42wim/matterbridge/wiki/How-to-create-your-config)]

It is available at [https://{% if matterbridge.domain %}{{ matterbridge.domain }}{% else %}{{ matterbridge.subdomain + "." + domain }}{% endif %}/](https://{% if matterbridge.domain %}{{ matterbridge.domain }}{% else %}{{ matterbridge.subdomain + "." + domain }}{% endif %}/) or [http://{% if matterbridge.domain %}{{ matterbridge.domain }}{% else %}{{ matterbridge.subdomain + "." + domain }}{% endif %}/](http://{% if matterbridge.domain %}{{ matterbridge.domain }}{% else %}{{ matterbridge.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ matterbridge + "." + tor_domain }}/](http://{{ matterbridge + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth set the service config to True
`settings/config.yml`

```
matterbridge:
  https_only: True
  auth: True
```