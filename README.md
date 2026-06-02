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

## Kiểm thử local (Local Testing)

Dự án sử dụng công cụ `html-proofer` (Ruby gem) để thực hiện kiểm thử tự động cấu trúc HTML và các liên kết (nội bộ/bên ngoài) của trang web sau khi biên dịch.

> [!WARNING]
> **LƯU Ý VỀ PHIÊN BẢN RUBY 4.0+**
> Gem `github-pages` và các phụ thuộc của nó (như `commonmarker`) chỉ hỗ trợ Ruby **từ phiên bản 2.6 đến dưới 4.0**. Nếu máy của bạn đang chạy **Ruby 4.0+** (ví dụ phiên bản mặc định của hệ thống), quá trình `bundle install` sẽ gặp lỗi phân giải phiên bản (`version solving has failed`).
>
> Vui lòng sử dụng **Cách 2 (Sử dụng Docker)** hoặc **Cách 3 (Sử dụng rbenv/rvm)** bên dưới để kiểm thử và chạy local thành công.

---

### CÁCH 1: Chạy trực tiếp trên máy host (Yêu cầu Ruby 2.6 -> 3.x)

Nếu máy bạn đang cài đặt Ruby phiên bản thích hợp:

#### 1. Cài đặt các thư viện kiểm thử:
```bash
bundle install
```

#### 2. Biên dịch trang web (Build site):
```bash
bundle exec jekyll build --strict_front_matter
```
*Lưu ý: Tham số `--strict_front_matter` giúp phát hiện sớm các lỗi cấu hình YAML Front Matter ở đầu mỗi bài viết.*

#### 3. Chạy kiểm thử tự động với HTMLProofer:
- **Kiểm thử nhanh (Bỏ qua các liên kết ngoài - Khuyên dùng):**
  Lệnh này giúp xác minh nhanh các liên kết nội bộ, cấu trúc thẻ đóng/mở HTML, và các thẻ `alt` của hình ảnh mà không phụ thuộc vào kết nối mạng:
  ```bash
  bundle exec htmlproofer ./_site --allow-hash-href --disable-external
  ```
- **Kiểm thử đầy đủ (Bao gồm cả kiểm tra liên kết ngoài):**
  Lệnh này sẽ ping tới tất cả các liên kết bên ngoài để kiểm tra xem link có bị die hay không:
  ```bash
  bundle exec htmlproofer ./_site --allow-hash-href
  ```

---

### CÁCH 2: Sử dụng Docker (Khuyên dùng - Không cần cài đặt Ruby)

Nếu máy bạn cài đặt **Ruby 4.0+** hoặc bạn không muốn cài đặt môi trường Ruby lên máy cá nhân, sử dụng Docker là giải pháp tốt nhất để tránh xung đột phiên bản.

#### 1. Khởi chạy server local để phát triển (Jekyll Serve):
```bash
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -p 4000:4000 \
  -it jekyll/jekyll:4.2.0 \
  jekyll serve
```
*Truy cập trang web tại: `http://localhost:4000`*

#### 2. Chạy bộ kiểm thử tự động (Build & HTMLProofer) bằng Docker:
Chúng ta sẽ dựng container, build dự án và chạy `html-proofer` bằng các lệnh:
```bash
# Bước 1: Build trang web sang thư mục _site
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll:4.2.0 \
  jekyll build --strict_front_matter

# Bước 2: Chạy html-proofer kiểm thử
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll:4.2.0 \
  htmlproofer ./_site --allow-hash-href --disable-external
```

---

### CÁCH 3: Sử dụng bộ quản lý phiên bản Ruby (rbenv / rvm)

Nếu bạn muốn chạy trực tiếp trên máy host nhưng đang cài sẵn Ruby 4.0+, hãy sử dụng `rbenv` để chuyển đổi phiên bản thích hợp:

```bash
# Cài đặt Ruby phiên bản 3.2.2
rbenv install 3.2.2
rbenv local 3.2.2

# Cài đặt các gem và chạy bộ kiểm thử
bundle install
bundle exec jekyll build --strict_front_matter
bundle exec htmlproofer ./_site --allow-hash-href --disable-external
```

---

### 4. Kiểm thử thủ công JavaScript
Nếu bạn thực hiện thay đổi logic tìm kiếm (`blog-search.js`, `bm25-search.js`) hoặc mục lục (`toc.js`):
1. Chạy server local (qua máy host hoặc qua Docker).
2. Mở trình duyệt tại `http://localhost:4000`.
3. Nhấn `F12` (hoặc `Ctrl + Shift + I`) để mở Developer Tools và chọn tab **Console**.
4. Thực hiện tương tác trên giao diện để kiểm tra xem có bất kỳ lỗi JavaScript runtime nào phát sinh hay không.

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

