# Ollama

[Ollama](https://github.com/ollama/ollama) makes it easy to get up and running with large language models locally.

## Setup

SSH into the machine running HomelabOS and install a model like so:

```
docker exec -it ollama_ollama_1 bash
ollama run llama2
```

You can then make direct requests within the container using standard ollama interface, or hit the external CURL endpoint, like:

```
curl https://{% if ollama.domain %}{{ ollama.domain }}{% else %}{{ ollama.subdomain + "." + domain }}{% endif %}/api/chat -d '{
  "model": "llama2",
  "messages": [
    { "role": "user", "content": "why is the sky blue?" }
  ]
}'
```

### Warning!

This endpoint is publicly accessible, with no rate limiting. It could lead to pain.

## Access

It is available at [https://{% if ollama.domain %}{{ ollama.domain }}{% else %}{{ ollama.subdomain + "." + domain }}{% endif %}/](https://{% if ollama.domain %}{{ ollama.domain }}{% else %}{{ ollama.subdomain + "." + domain }}{% endif %}/) or [http://{% if ollama.domain %}{{ ollama.domain }}{% else %}{{ ollama.subdomain + "." + domain }}{% endif %}/](http://{% if ollama.domain %}{{ ollama.domain }}{% else %}{{ ollama.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ ollama.subdomain + "." + tor_domain }}/](http://{{ ollama.subdomain + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth set the service config to True
`settings/config.yml`

```
ollama:
  https_only: True
  auth: True
```
