# Plausible

[Plausible](https://github.com/plausible/analytics) is a "simple, open-source, lightweight (< 1 KB) and privacy-friendly web analytics alternative to Google Analytics."

## Access

It is available at [https://{% if plausible.domain %}{{ plausible.domain }}{% else %}{{ plausible.subdomain + "." + domain }}{% endif %}/](https://{% if plausible.domain %}{{ plausible.domain }}{% else %}{{ plausible.subdomain + "." + domain }}{% endif %}/) or [http://{% if plausible.domain %}{{ plausible.domain }}{% else %}{{ plausible.subdomain + "." + domain }}{% endif %}/](http://{% if plausible.domain %}{{ plausible.domain }}{% else %}{{ plausible.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ plausible.subdomain + "." + tor_domain }}/](http://{{ plausible.subdomain + "." + tor_domain }}/)
{% endif %}
