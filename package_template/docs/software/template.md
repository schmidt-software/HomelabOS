# PackageTitleCase

[PackageTitleCase](PackageURL) PackageOneLiner

**Version** {{ PackageFilename.version }}  (if a version is not displayed here, then it is built during deployment of HomelabOS)

**Supported Architectures:** amd64, <NOTICE: maintainer!!!, complete this yourself, if you don't know what architectures it supports, dont add it!>

## Setup

To enable PackageTitleCase, run the following command:

**`make enable PackageFileName`**

To finalise any changes made, please run:

**`make update_one PackageFileName`**

More information about available commands can be found in the documentation, [here]()

## First run
### Admin setup

navigate to ...

## Access

PackageTitleCase is available at [https://{% if PackageFileName.domain %}{{ PackageFileName.domain }}{% else %}{{ PackageFileName.subdomain + "." + domain }}{% endif %}/](https://{% if PackageFileName.domain %}{{ PackageFileName.domain }}{% else %}{{ PackageFileName.subdomain + "." + domain }}{% endif %}/) or [http://{% if PackageFileName.domain %}{{ PackageFileName.domain }}{% else %}{{ PackageFileName.subdomain + "." + domain }}{% endif %}/](http://{% if PackageFileName.domain %}{{ PackageFileName.domain }}{% else %}{{ PackageFileName.subdomain + "." + domain }}{% endif %}/)

{% if enable_tor %}
It is also available via Tor at [http://{{ PackageFileName.subdomain + "." + tor_domain }}/](http://{{ PackageFileName.subdomain + "." + tor_domain }}/)
{% endif %}

## Security enable/disable https_only and auth

To enable https_only or auth, run the corresponding example of either following command:

**`make https only`**
**`make auth enable`**

make either of the following changes to the `settings/config.yml` file:

```
PackageFileName:
  https_only: True
  auth: True
```
