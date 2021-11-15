# Papercups

[Papercups](https://papercups.io/) is open source customer messaging, built for startups and enterprise alike.

## Access

It is available at [https://{% if papercups.domain %}{{ papercups.domain }}{% else %}{{ papercups.subdomain + "." + domain }}{% endif %}/](https://{% if papercups.domain %}{{ papercups.domain }}{% else %}{{ papercups.subdomain + "." + domain }}{% endif %}/) or [http://{% if papercups.domain %}{{ papercups.domain }}{% else %}{{ papercups.subdomain + "." + domain }}{% endif %}/](http://{% if papercups.domain %}{{ papercups.domain }}{% else %}{{ papercups.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ papercups.subdomain + "." + tor_domain }}/](http://{{ papercups.subdomain + "." + tor_domain }}/)
{% endif %}
