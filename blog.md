---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Đây là nơi tôi chia sẻ suy nghĩ, kinh nghiệm và kiến thức về lập trình.

<ul>
  {% for post in site.posts %}
    <li>
      <h3>
        <a href="{{ post.url | relative_url }}">
          {{ post.title }}
        </a>
      </h3>
      <p>{{ post.date | date: "%d/%m/%Y" }}</p>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>

