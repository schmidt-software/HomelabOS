# Tubearchivist

[Tubearchivist](https://github.com/bbilly1/tubearchivist) Your self hosted YouTube media server

## Access

It is available at [https://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/](https://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/) or [http://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/](http://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ tubearchivist.subdomain + "." + tor_domain }}/](http://{{ tubearchivist.subdomain + "." + tor_domain }}/)
{% endif %}
