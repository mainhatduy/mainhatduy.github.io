---
layout: post
title: "Tìm hiểu về Git và GitHub"
date: 2025-10-03 14:30:00 +0700
categories: [git, tutorial]
---

Git và GitHub là hai công cụ không thể thiếu đối với bất kỳ lập trình viên nào. Trong bài viết này, tôi sẽ chia sẻ những kiến thức cơ bản và một số tips hữu ích khi làm việc với chúng.

## Git là gì?

**Git** là một hệ thống quản lý phiên bản phân tán (Distributed Version Control System - DVCS) được phát triển bởi Linus Torvalds vào năm 2005. Git giúp bạn:

- Theo dõi lịch sử thay đổi của code
- Làm việc nhóm hiệu quả hơn
- Quay lại phiên bản cũ khi cần thiết
- Tạo các nhánh để phát triển tính năng mới

## GitHub là gì?

**GitHub** là một dịch vụ lưu trữ code dựa trên Git, cung cấp giao diện web thân thiện và nhiều tính năng bổ sung như:

- Issues tracking
- Pull requests
- GitHub Actions (CI/CD)
- GitHub Pages (hosting website tĩnh)
- Collaboration tools

## Các lệnh Git cơ bản

Dưới đây là một số lệnh Git mà bạn sẽ sử dụng hàng ngày:

### 1. Khởi tạo repository

```bash
git init
```

### 2. Clone repository từ GitHub

```bash
git clone https://github.com/username/repository.git
```

### 3. Kiểm tra trạng thái

```bash
git status
```

### 4. Thêm file vào staging area

```bash
# Thêm một file cụ thể
git add filename.txt

# Thêm tất cả các file đã thay đổi
git add .
```

### 5. Commit thay đổi

```bash
git commit -m "Mô tả ngắn gọn về thay đổi"
```

### 6. Push lên GitHub

```bash
git push origin main
```

### 7. Pull code mới nhất

```bash
git pull origin main
```

## Làm việc với branches

Branches (nhánh) là một trong những tính năng mạnh mẽ nhất của Git:

```bash
# Tạo nhánh mới
git branch feature-name

# Chuyển sang nhánh khác
git checkout feature-name

# Tạo và chuyển sang nhánh mới (shorthand)
git checkout -b feature-name

# Merge nhánh vào main
git checkout main
git merge feature-name

# Xóa nhánh
git branch -d feature-name
```

## Best Practices

### 1. Commit messages rõ ràng

Viết commit message theo format:

```
[Type] Mô tả ngắn gọn

- Chi tiết thay đổi 1
- Chi tiết thay đổi 2
```

Ví dụ:
```
[Feature] Thêm chức năng đăng nhập

- Tạo form đăng nhập
- Xử lý authentication
- Thêm validation
```

### 2. Commit thường xuyên

Đừng chờ đến khi hoàn thành toàn bộ tính năng mới commit. Hãy commit sau mỗi thay đổi có ý nghĩa.

### 3. Sử dụng .gitignore

Tạo file `.gitignore` để loại trừ các file không cần thiết:

```
# Node modules
node_modules/

# Environment variables
.env

# Build files
dist/
build/

# IDE settings
.vscode/
.idea/
```

### 4. Pull trước khi Push

Trước khi push code lên remote repository, luôn pull code mới nhất để tránh conflict:

```bash
git pull origin main
git push origin main
```

## Git Workflow phổ biến

### Feature Branch Workflow

1. Tạo nhánh mới từ `main` cho mỗi tính năng
2. Phát triển tính năng trên nhánh đó
3. Tạo Pull Request để review
4. Merge vào `main` sau khi được approve

### Gitflow Workflow

Sử dụng nhiều nhánh với mục đích cụ thể:
- `main`: Code production
- `develop`: Code đang phát triển
- `feature/*`: Các tính năng mới
- `hotfix/*`: Sửa lỗi khẩn cấp
- `release/*`: Chuẩn bị release

## Xử lý Merge Conflicts

Khi nhiều người cùng chỉnh sửa một file, có thể xảy ra conflict:

```bash
# Pull code mới nhất
git pull origin main

# Nếu có conflict, Git sẽ báo
# Mở file có conflict và tìm đoạn như sau:
<<<<<<< HEAD
Your changes
=======
Changes from remote
>>>>>>> branch-name

# Chỉnh sửa code, chọn version nào giữ lại
# Sau đó add và commit
git add .
git commit -m "Resolve merge conflict"
```

## Một số lệnh hữu ích

```bash
# Xem lịch sử commit
git log

# Xem lịch sử commit dạng đẹp hơn
git log --oneline --graph --all

# Xem thay đổi chưa commit
git diff

# Hoàn tác thay đổi (chưa commit)
git checkout -- filename.txt

# Hoàn tác commit (giữ nguyên thay đổi)
git reset --soft HEAD~1

# Xem remote repository
git remote -v
```

## Kết luận

Git và GitHub là những công cụ thiết yếu trong quy trình phát triển phần mềm hiện đại. Việc nắm vững các khái niệm cơ bản và best practices sẽ giúp bạn làm việc hiệu quả hơn, đặc biệt khi làm việc nhóm.

Hãy thực hành thường xuyên và đừng ngại thử nghiệm với các tính năng khác nhau của Git. Bạn có thể tạo một repository test để thoải mái thử nghiệm mà không sợ làm hỏng code chính!

## Tài liệu tham khảo

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

---

*Happy coding with Git! 🚀*

