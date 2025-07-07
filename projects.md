---
layout: page
title: "Projects & Technical"
category: projects
---

# Projects & Technical

{% assign posts = site.categories.projects %}
{% for post in posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.description }}
{% endfor %}
