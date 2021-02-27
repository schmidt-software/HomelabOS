# Friendica

[Friendica](https://friendi.ca) A Decentralized Social Network

## Setup

To enable Friendica, run the following command:

`make set friendica.enable True`

## First run
### Admin setup

The default `admin_email` from `settings/config.yml` will be used to configure the instance admin.

Visit your instance and register a user with the configured admin email, this will create your admin account for you. The rest of the setup should be automatically populated.

## Access

Friendica is available at [https://{% if friendica.domain %}{{ friendica.domain }}{% else %}{{ friendica.subdomain + "." + domain }}{% endif %}/](https://{% if friendica.domain %}{{ friendica.domain }}{% else %}{{ friendica.subdomain + "." + domain }}{% endif %}/) or [http://{% if friendica.domain %}{{ friendica.domain }}{% else %}{{ friendica.subdomain + "." + domain }}{% endif %}/](http://{% if friendica.domain %}{{ friendica.domain }}{% else %}{{ friendica.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ friendica.subdomain + "." + tor_domain }}/](http://{{ friendica.subdomain + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth, run the corresponding example of either following command:

`make set friendica.https_only True`
`make set friendica.auth True`

Or make either of the following changes to the `settings/config.yml` file:

```
friendica:
  https_only: True
  auth: True
```

Then run `make` or `make update_one friendica`.
