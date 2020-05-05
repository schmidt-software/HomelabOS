# Inventario

[Inventario](https://gitlab.com/NickBusey/inventario) is a home inventory management system.


## Setup

To enable Inventario; run **`make set inventario.enable true`**, then run **`make update`** to update HomelabOS

For further information, check out Inventario on [Gitlab](https://gitlab.com/NickBusey/inventario)

## Access

By default, Inventario will be available at either:

[https://inventario.{{ domain }}/](https://inventario.{{ domain }}/)

[http://inventario.{{ domain }}/](http://inventario.{{ domain }}/)

{% if enable_tor %}
Inventario is available via Tor at [http://inventario.{{ tor_domain }}/](http://inventario.{{ tor_domain }}/)
{% endif %}