# Cachet

[Cachet](https://cachethq.io/) The open source status page system.

## Access

It is available at [https://cachet.{{ domain }}/](https://cachet.{{ domain }}/) or [http://cachet.{{ domain }}/](http://cachet.{{ domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://cachet.{{ tor_domain }}/](http://cachet.{{ tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth set the service config to True
`settings/config.yml`

cachet:
  https_only: True
  auth: True