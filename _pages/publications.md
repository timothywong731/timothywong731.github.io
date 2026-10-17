---
layout: archive
title: "Publications"
description: "Research papers by Timothy Wong on recurrent auto-encoders for industrial sensor signals and mobile coverage analysis using crowdsourced data."
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
