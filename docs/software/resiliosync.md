# Resilio Sync

[resiliosync](https://www.resilio.com/) is a powerful file synchronization tool. It uses the bittorrent protocol for a efficient multi-host syncing. It allows remote encrypted copies. The more hosts you have the faster the syncing.

## Access

It is available at [https://{% if resiliosync.domain %}{{ resiliosync.domain }}{% else %}{{ resiliosync.subdomain + "." + domain }}{% endif %}/](https://{% if resiliosync.domain %}{{ resiliosync.domain }}{% else %}{{ resiliosync.domain + "." + domain }}{% endif %}/) or [http://{% if resiliosync.domain %}{{ resiliosync.domain }}{% else %}{{ resiliosync.domain + "." + domain }}{% endif %}/](http://{% if resiliosync.domain %}{{ resiliosync.domain }}{% else %}{{ resiliosync.domain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ resiliosync.domain + "." + tor_domain }}/](http://{{ resiliosync.domain + "." + tor_domain }}/)
{% endif %}
