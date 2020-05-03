# Introduction/ FAQs

This is the Introduction and Frequently Asked Questions section.
The page table of contents to navigate it quickly. Also the search in these docs is instant and easy.

## What is HomelabOS, and what does HomelabOS actually do?

HomelabOS deploys web services via docker-compose files that are controlled by systemd.

## How does it do it?

Ansible templates out the HomelabOS config file using Jinja2 templating, which is then used to deploy HomelabOS itself.
It uses a combination of a Makefile, several bash scripts, and ansible playbooks to get everything done.

## Why does it do it that way, and why should I use it?

Through much trial and error we have ended up on this configuration.
We are always more than happy to discuss better ways to do things, please open an issue on [GitLab](https://gitlab.com/NickBusey/HomelabOS/-/issues), submit a topic to [Reddit](https://www.reddit.com/r/HomelabOS/), or join us on our [Zulip chat](https://homelabos.zulipchat.com/).

HomelabOS makes it easy to deploy your own/self-hosted services; with HomelabOS, privacy is now possible, even with limited experience or knowledge.
With a few commands, complete services can be available at your chosen domain;
PLEASE NOTE: HomelabOS is not designed to assist with setting up a domain, there are plenty of resources on the web

## I'm just starting out, where do I find out how to install HomelabOS?
[Installation](https://homelabos.com/docs/setup/installation/) docs

## How do I use HomelabOS?
So, now you have HomelabOS installed, check out [Getting Started](https://homelabos.com/docs/setup/gettingstarted/), it has all you need to 
Getting Started also contains a list of [commands](https://homelabos.com/docs/setup/gettingstarted/#homelab-commands), feel free to bookmark this really useful page. 

## Can HomelabOS handle multiple domains? / Can I have a different domain for a specific service?

Yes, though HomelabOS assumes that you already have access to the domain you want to use; once you do, follow on [here](https://homelabos.com/docs/setup/gettingstarted/#custom-domains)

## I'm having issues, can someone help?

1. The [Troubleshooting](https://homelabos.com/docs/setup/troubleshooting/) docs should be your first stop on your journey.
    This may be the only documentation you will ever need
2. Check the HomelabOS [subReddit](https://www.reddit.com/r/HomelabOS/)
3. For urgent, or undocumented questions, use the [Zulip chat](https://homelabos.zulipchat.com/),
    Just make sure you have checked out the [Troubleshooting](https://homelabos.com/docs/setup/troubleshooting/) docs first, there's a good chance it is there
