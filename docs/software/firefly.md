# Firefly III

[Firefly III](https://firefly-iii.org/) is a money management app.

## Access

It is available at [https://{{ firefly_iii.domain }}/](https://{{ firefly_iii.domain }}/) or [http://{{ firefly_iii.domain }}/](http://{{ firefly_iii.domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://money.{{ tor_domain }}/](http://money.{{ tor_domain }}/)
{% endif %}
