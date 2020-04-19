# phpldapadmin

[docker-phpLDAPadmin](https://github.com/osixia/docker-phpLDAPadmin) provides LDAP.

## Access

It is available at [https://{{ openldap.domain }}/](https://openldap.domain }}/) or [http://{{ openldap.domain }}/](http://{{ openldap.domain }}/)

{% if enable_tor %}
It is also available via Tor at [http://phpldapadmin.{{ tor_domain }}/](http://phpldapadmin.{{ tor_domain }}/)
{% endif %}
