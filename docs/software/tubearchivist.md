# Tubearchivist

[Tubearchivist](https://github.com/bbilly1/tubearchivist) Your self hosted YouTube media server

## Access

Admin credentials:
- Admin username is defined in `TA_USERNAME` variable which is `tubearchivist` by default
- Admin password is defined in `TA_PASSWORD` variable. Ansible will generate a random password

Feel free to create a different user with your own credentials if you feel like doing so

----

It is available at [https://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/](https://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/) or [http://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/](http://{% if tubearchivist.domain %}{{ tubearchivist.domain }}{% else %}{{ tubearchivist.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ tubearchivist.subdomain + "." + tor_domain }}/](http://{{ tubearchivist.subdomain + "." + tor_domain }}/)
{% endif %}
