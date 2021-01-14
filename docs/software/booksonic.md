# Booksonic

[Booksonic](https://booksonic.org/) The selfhosted audiobook server

The docker image comes from [linuxserver/booksonic-air](https://hub.docker.com/r/linuxserver/booksonic-air).

## Access

Booksonic is available at [https://{% if booksonic.domain %}{{ booksonic.domain }}{% else %}{{ booksonic.subdomain + "." + domain }}{% endif %}/](https://{% if booksonic.domain %}{{ booksonic.domain }}{% else %}{{ booksonic.subdomain + "." + domain }}{% endif %}/) or [http://{% if booksonic.domain %}{{ booksonic.domain }}{% else %}{{ booksonic.subdomain + "." + domain }}{% endif %}/](http://{% if booksonic.domain %}{{ booksonic.domain }}{% else %}{{ booksonic.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ booksonic.subdomain + "." + tor_domain }}/](http://{{ booksonic.subdomain + "." + tor_domain }}/)
{% endif %}

