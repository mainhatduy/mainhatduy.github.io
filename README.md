# mainhatduy.github.io

Trang cá nhân và blog của Mai Nhật Duy.

## Giới thiệu

Website này được xây dựng bằng Jekyll và GitHub Pages.

## Cấu trúc dự án

- `_config.yml` - Cấu hình Jekyll
- `index.md` - Trang chủ
- `blog.md` - Trang danh sách blog
- `_posts/` - Thư mục chứa các bài blog
- `Gemfile` - Dependencies của Ruby

## Xem website

Truy cập: [https://mainhatduy.github.io](https://mainhatduy.github.io)

## Phát triển local

```bash
# Cài đặt dependencies
bundle install

# Chạy server local
bundle exec jekyll serve

# Truy cập http://localhost:4000
```

## Theme

Website sử dụng theme: `jekyll-theme-minimal`

Để thay đổi theme, chỉnh sửa dòng `theme:` trong file `_config.yml`.

Các theme được hỗ trợ bởi GitHub Pages:
- jekyll-theme-minimal
- jekyll-theme-cayman
- jekyll-theme-slate
- jekyll-theme-hacker
- jekyll-theme-architect
- jekyll-theme-time-machine
- jekyll-theme-leap-day
- jekyll-theme-merlot
- jekyll-theme-midnight
- jekyll-theme-tactile
- jekyll-theme-dinky
- jekyll-theme-modernist

Xem thêm: [GitHub Pages Documentation](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll)

