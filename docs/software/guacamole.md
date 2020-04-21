# Guacamole

[Guacamole](https://guacamole.apache.org) is a clientless remote desktop gateway. It supports standard protocols like VNC, RDP, and SSH.

## Access

It is available at [https://{{ guacamole.domain }}/](https://{{ guacamole.domain }}/) or [http://{{ guacamole.domain }}/](http://{{ guacamole.domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://guacamole.{{ tor_domain }}/](http://guacamole.{{ tor_domain }}/)
{% endif %}
