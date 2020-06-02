# Darksky

[darksky-influxdb](https://github.com/ErwinSteffens/darksky-influxdb) pulls in weather data for your location every 2 minutes from [Darksky](http://darksky.net/) and saves it to your [InfluxDB](/software/influxdb) instance.

You need to get an API key first from [Darksky](http://darksky.net/dev/)

The docker image comes from [erwinsteffens/darksky-influxdb:latest](erwinsteffens/darksky-influxdb:latesthttps://hub.docker.com/search?q=quay.io%2Fcodimd%2Fserver&type=image) and currently does not support arm devices. If you are aware of a suitable substitution or replacement, [please see issue 478](https://gitlab.com/NickBusey/HomelabOS/-/issues/478) and test your idea using the [documentation](https://homelabos.com/docs/development/adding_services/).

## Access

There is no direct access to it, but you can create graphs in [Grafana](/software/grafana) to visualize it.
