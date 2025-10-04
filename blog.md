---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Nơi tôi chia sẻ suy nghĩ, kinh nghiệm và kiến thức về công nghệ.

<ul>
  {% for post in site.posts %}
    <li>
      <h3>
        <a href="{{ post.url | relative_url }}">
          {{ post.title }}
        </a>
      </h3>
      <p class="text-muted">{{ post.date | date: "%d.%m.%Y" }}</p>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
