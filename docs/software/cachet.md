# Cachet

[Cachet](https://cachethq.io/) The open source status page system.

## Access

It is available at [https://cachet.{{ domain }}/](https://cachet.{{ domain }}/) or [http://cachet.{{ domain }}/](http://cachet.{{ domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://cachet.{{ tor_domain }}/](http://cachet.{{ tor_domain }}/)
{% endif %}

## First run requirement

Setup the APP_KEY

Whilst the container is up and running, find the name of the Cachet container via docker ps.

Run `docker-compose -f docker-compose.cachet.yml logs -f cachet`.

Replace `${APP_KEY:-null}` in `docker-compose.override.yml` with the newly generated Application key shown in the logs.

Note: make sure you include `base64:` prefix. E.g. `base64:YOUR_UNIQUE_KEY`

Run `systemctl restart cachet`.

## Security enable/disable https_only and auth

To enable https_only or auth set the service config to True
`settings/config.yml`

```
cachet:
  https_only: True
  auth: True
```