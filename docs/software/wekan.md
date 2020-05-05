# Wekan

[Wekan](https://wekan.github.io/) Open source Kanban board with MIT license


## Setup

To enable Wekan; run **`make set wekan.enable true`**, then run **`make update`** to update HomelabOS

For further information, check out Zulip on [Github](https://github.com/wekan/wekan)

## Access

By default, Zulip will be available at either:

[https://wekan.{{ domain }}/](https://wekan.{{ domain }}/)

[http://wekan.{{ domain }}/](http://wekan.{{ domain }}/)

{% if enable_tor %}
Wekan is available via Tor at [http://wekan.{{ tor_domain }}/](http://wekan.{{ tor_domain }}/)
{% endif %}
