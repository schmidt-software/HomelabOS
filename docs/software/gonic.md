# Gonic

[Gonic](https://github.com/sentriz/gonic) Subsonic server API implementation in Go

**Supported Architectures:** amd64, armv6, armv7, arm64

## Access

Gonic is available at [https://{% if gonic.domain %}{{ gonic.domain }}{% else %}{{ gonic.subdomain + "." + domain }}{% endif %}/](https://{% if gonic.domain %}{{ gonic.domain }}{% else %}{{ gonic.subdomain + "." + domain }}{% endif %}/) or [http://{% if gonic.domain %}{{ gonic.domain }}{% else %}{{ gonic.subdomain + "." + domain }}{% endif %}/](http://{% if gonic.domain %}{{ gonic.domain }}{% else %}{{ gonic.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ gonic.subdomain + "." + tor_domain }}/](http://{{ gonic.subdomain + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth, run the corresponding example of either following command:

**`hlos https only`**
**`hlos auth enable`**

make either of the following changes to the `settings/config.yml` file:

```
gonic:
  https_only: True
  auth: True
```
