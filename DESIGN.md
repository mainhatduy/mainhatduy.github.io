# Industrial Minimalism Design System

## Philosophy

Thiết kế này tuân theo triết lý **tối giản công nghiệp** (Industrial Minimalism) - một phong cách kết hợp giữa sự đơn giản của chủ nghĩa tối giản với sự chắc chắn, tinh tế của thiết kế công nghiệp.

## Design Principles

### 1. **Whitespace is Content**
Không gian trắng không phải là không gian trống - đó là phần quan trọng của thiết kế, giúp nội dung thở và dễ đọc hơn.

### 2. **Typography First**
- Font chính: **Inter** - clean, modern, readable
- Font monospace: **IBM Plex Mono** - technical, precise
- Type scale: Modular scale với tỷ lệ 1.25 (Major Third)
- Line height: 1.75 cho body text để dễ đọc

### 3. **8pt Grid System**
Tất cả spacing đều dựa trên bội số của 8px:
- 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
- Tạo nhịp điệu và consistency trong design

### 4. **Monochrome Palette**
```
Primary:     #0a0a0a (Almost Black)
Secondary:   #1a1a1a (Dark Gray)
Text:        #1a1a1a (Dark Gray)
Text Muted:  #666666 (Medium Gray)
Text Light:  #999999 (Light Gray)
Border:      #e0e0e0 (Very Light Gray)
Background:  #ffffff (White)
Highlight:   #0066cc (Blue - minimal accent)
```

### 5. **Micro-interactions**
- Smooth transitions (250ms cubic-bezier)
- Subtle hover effects
- Progressive disclosure
- Feedback on interaction

### 6. **Mobile-First & Responsive**
- Breakpoints: 480px, 768px, 1200px
- Touch-friendly navigation
- Readable on all devices

### 7. **Accessibility**
- Semantic HTML5
- ARIA labels
- High contrast ratio
- Keyboard navigation
- Focus visible states

## Components

### Navigation
- Fixed top navigation với backdrop blur
- Clean hamburger menu cho mobile
- Underline animation on hover

### Typography Hierarchy
```
H1: 48px - Hero titles
H2: 32px - Section headers (with border-bottom)
H3: 24px - Subsection headers
H4: 20px - Minor headers
Body: 16px - Readable paragraph text
Small: 14px - Meta information
```

### Content Layout
- Max-width: 1200px (optimal reading width)
- Generous padding: 96px vertical, 32px horizontal
- Clear visual hierarchy

### Footer
- Minimal, centered
- Subtle background color differentiation

## Technical Stack

- **Framework**: Jekyll
- **Fonts**: Google Fonts (Inter, IBM Plex Mono)
- **CSS**: SCSS with CSS custom properties
- **Icons**: None (text-based, clean)

## Performance

- Preconnect to Google Fonts
- Minimal CSS (~10KB gzipped)
- No JavaScript frameworks
- Fast page loads

## Inspiration

- Swiss Design / International Typographic Style
- Bauhaus
- Dieter Rams' 10 principles
- Modern industrial design

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Reading time indicators
- [ ] Table of contents for long posts
- [ ] Code syntax highlighting themes
- [ ] Image lazy loading
- [ ] Progressive Web App features

---

**Designer:** Mai Nhật Duy  
**Version:** 1.0  
**Last Updated:** October 2025

