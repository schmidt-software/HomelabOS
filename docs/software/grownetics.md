# Grownetics

[Grownetics](https://grownetics.co/) is an open source environmental mapping with plant management and tracking software suite.

## Setup

To create the database run `docker exec -it grownetics_growdash_1 ./seed.sh`.

Login with default credentials:

User: `admin@grownetics.co`

Pass: `GrowBetter16`

## Access

It is available at [https://{{ grocy.domain }}/](https://{{ grocy.domain }}/) or [http://{{ grocy.domain }}/](http://{{ grocy.domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://grownetics.{{ tor_domain }}/](http://grownetics.{{ tor_domain }}/)
{% endif %}
