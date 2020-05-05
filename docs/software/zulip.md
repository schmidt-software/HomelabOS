# Zulip

[Zulip](https://github.com/zulip/zulip) is a threaded chat service.
Check it out at [ZulipChat.com](https://zulipchat.com)

## Setup

To enable Zulip chat; run **`make set zulip.enable true`**, then run **`make update`** to update HomelabOS

For further information, check out [https://github.com/zulip/docker-zulip](https://github.com/zulip/docker-zulip)

## Access

By default, Inventario will be available at either:
[https://zulip.{{ domain }}/](https://zulip.{{ domain }}/)
[http://zulip.{{ domain }}/](http://zulip.{{ domain }}/)

{% if enable_tor %}
Zuplip chat is available via Tor at [http://zulip.{{ tor_domain }}/](http://zulip.{{ tor_domain }}/)
{% endif %}