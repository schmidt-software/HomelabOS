# PackageTitleCase

[PackageTitleCase](PackageURL) PackageOneLiner

**Current Version**: {% if PackageFilename.version %}{{ PackageFilename.version }}{% else %}This package is built during deployment of HomelabOS.{% endif %}

**Supported Architectures:** amd64, !!! NOTICE: complete this yourself, if you don't know what architectures it supports, dont add it !!!

## Setup

To enable PackageTitleCase, run the following command:

**`make enable PackageFileName`**

To finalise any changes made, please run:

**`make update_one PackageFileName`** or just run **`make`**

More information about available commands can be found in the documentation, [here]()

## First run
### Admin setup

!!! INCLUDE: how to set up an admin account !!!
!!! If there are any things to note, please add them in another heading or above admin setup !!!

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

## PackageTitleCase without HomelabOS? Can I do that?!

If this line is here, the user that added this package, did not include a way to use PackageTitleCase without HomelabOS.
Please use 
