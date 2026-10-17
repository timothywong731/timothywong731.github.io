---
layout: archive
title: "Sitemap"
description: "Every page on the site. There is also an XML sitemap for search engines and an llms.txt summary for AI tools."
permalink: /sitemap/
---

<div class="prose sitemap">
  <h2>Pages</h2>
  <ul>
    {%- assign pages = site.pages | where_exp: "p", "p.title != nil" | where_exp: "p", "p.sitemap != false" | sort: "title" %}
    {%- for p in pages %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {%- endfor %}
  </ul>

  {%- assign kinds = site.data.navigation.main | where_exp: "k", "k.collection != nil" %}
  {%- for k in kinds %}
  <h2>{{ k.title }}</h2>
  <ul>
    {%- assign docs = site[k.collection] | sort: "date" | reverse %}
    {%- for d in docs %}
    <li><a href="{{ d.url | relative_url }}">{{ d.title | strip }}</a></li>
    {%- endfor %}
  </ul>
  {%- endfor %}

  <p><a href="{{ '/sitemap.xml' | relative_url }}">XML sitemap</a> and <a href="{{ '/llms.txt' | relative_url }}">llms.txt</a></p>
</div>
