# Pleroma

[Pleroma](https://github.com/angristan/docker-pleroma) Pleroma is a federated social networking platform, compatible with GNU social and other OStatus implementations. It is free software licensed under the AGPLv3.

## Access

It is available at [https://{% if pleroma.domain %}{{ pleroma.domain }}{% else %}{{ pleroma.subdomain + "." + domain }}{% endif %}/](https://{% if pleroma.domain %}{{ pleroma.domain }}{% else %}{{ pleroma.subdomain + "." + domain }}{% endif %}/) or [http://{% if pleroma.domain %}{{ pleroma.domain }}{% else %}{{ pleroma.subdomain + "." + domain }}{% endif %}/](http://{% if pleroma.domain %}{{ pleroma.domain }}{% else %}{{ airsonic.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ pleroma + "." + tor_domain }}/](http://{{ pleroma + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth set the service config to True
`settings/config.yml`

```
pleroma:
  https_only: True
  auth: True
```