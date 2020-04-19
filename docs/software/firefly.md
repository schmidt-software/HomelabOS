# Firefly III

[Firefly III](https://firefly-iii.org/) is a money management app.

## Access

It is available at [https://{{ firefly.domain }}/](https://{{ firefly.domain }}/) or [http://{{ firefly.domain }}/](http://{{ firefly.domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://money.{{ tor_domain }}/](http://money.{{ tor_domain }}/)
{% endif %}
