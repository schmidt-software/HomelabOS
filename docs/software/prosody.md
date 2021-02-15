# Prosody

[Prosody](https://prosody.im) Modern XMPP communication server

This service includes a Prosody XMPP server, a stun/turn server for voice and video calls, as well as an http upload server to allow sending files.

It uses the [xamanu/xmpp-server](https://github.com/xamanu/xmpp-server) docker images.

## Setup

To enable Prosody, run the following command:

`make set prosody.enable true`

To finalise any changes made, please run:

`make update_one prosody`

You will need to set some extra DNS for this service. The following CNAME records must be configured:
- conference.{% if prosody.domain %}{{ prosody.domain }}{% else %}{{ prosody.subdomain + "." + domain }}{% endif %}
- turn.{% if prosody.domain %}{{ prosody.domain }}{% else %}{{ prosody.subdomain + "." + domain }}{% endif %}

## Access

Prosody is available at [https://{% if prosody.domain %}{{ prosody.domain }}{% else %}{{ prosody.subdomain + "." + domain }}{% endif %}/](https://{% if prosody.domain %}{{ prosody.domain }}{% else %}{{ prosody.subdomain + "." + domain }}{% endif %}/) or [http://{% if prosody.domain %}{{ prosody.domain }}{% else %}{{ prosody.subdomain + "." + domain }}{% endif %}/](http://{% if prosody.domain %}{{ prosody.domain }}{% else %}{{ prosody.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ prosody.subdomain + "." + tor_domain }}/](http://{{ prosody.subdomain + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only

> Not yet supported in this draft

To enable https_only, run the following command:

`make set prosody.https_only true`

make the following change to the `settings/config.yml` file:

```
prosody:
  https_only: True
```

Warning: it is not recommended to set auth on prosody as this might prevent other people from interacting with your server. Unless you plan on having a private server for only other users with auth accounts.
