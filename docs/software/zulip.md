# Zulip

[Zulip](https://zulipchat.com) is a threaded chat service.


## Setup

To enable Zulip chat; run **`make set zulip.enable true`**, then run **`make update`** to update HomelabOS

For further information, check out Zulip on [Github](https://github.com/zulip/zulip)

## Access

By default, Zulip will be available at either:

[https://zulip.{{ domain }}/](https://zulip.{{ domain }}/)

[http://zulip.{{ domain }}/](http://zulip.{{ domain }}/)

{% if enable_tor %}
Zulip chat is available via Tor at [http://zulip.{{ tor_domain }}/](http://zulip.{{ tor_domain }}/)
{% endif %}
