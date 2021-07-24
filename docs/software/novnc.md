# NoVNC

[NoVNC](https://novnc.com) Remote desktop browser client

**Supported Architectures:** amd64

## Setup

To enable NoVNC, run the following command:

**`hlos enable novnc`**

To finalise any changes made, please run:

**`hlos update_one novnc`**

More information about available commands can be found in the documentation, [here]() 

## Access

NoVNC is available at [https://{% if novnc.domain %}{{ novnc.domain }}{% else %}{{ novnc.subdomain + "." + domain }}{% endif %}/](https://{% if novnc.domain %}{{ novnc.domain }}{% else %}{{ novnc.subdomain + "." + domain }}{% endif %}/) or [http://{% if novnc.domain %}{{ novnc.domain }}{% else %}{{ novnc.subdomain + "." + domain }}{% endif %}/](http://{% if novnc.domain %}{{ novnc.domain }}{% else %}{{ novnc.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ novnc.subdomain + "." + tor_domain }}/](http://{{ novnc.subdomain + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth, run the corresponding example of either following command:

**`hlos https only`**
**`hlos auth enable`**

make either of the following changes to the `settings/config.yml` file:

```
novnc:
  https_only: True
  auth: True
```
