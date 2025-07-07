---
layout: page
title: "Phenomenology"
category: phenomenology
---

# Phenomenology

{% assign posts = site.categories.phenomenology %}
{% for post in posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.description }}
{% endfor %}
