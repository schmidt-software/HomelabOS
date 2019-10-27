# Zulip

[Zulip](https://github.com/zulip/zulip) is a threaded chat service.

## Access

First Start, you have to create your Organization.

sudo docker-compose -f /var/homelabos/zulip/docker-compose.zulip.yml -p zulip exec zulip sudo -H -u zulip -g zulip /home/zulip/deployments/current/manage.py generate_realm_creation_link

It is available at [https://zulip.{{ domain }}/](https://zulip.{{ domain }}/) or [http://zulip.{{ domain }}/](http://zulip.{{ domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://zulip.{{ tor_domain }}/](http://zulip.{{ tor_domain }}/)
{% endif %}
