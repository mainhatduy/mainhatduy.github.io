# Mai Nhat Duy - Portfolio

Personal portfolio and academic resume of **Mai Nhat Duy** - AI Engineer & NLP Researcher.

The website is designed with a minimal and modern dark theme, optimizing page load speed and user experience across all devices.

## Technologies Used
The project has been refactored from a complex Jekyll setup into an extremely minimalist and fast architecture:
- **HTML5**: Clean semantic layout, fully SEO optimized.
- **CSS3 (Vanilla)**: Responsive design, smooth gradients, and premium glassmorphism interface.
- **JavaScript (Vanilla)**: Handles mobile menu toggle, scroll tracking for active section highlighting, and scroll reveal animations using `IntersectionObserver`.

## Directory Structure
```text
.
├── assets/
│   ├── css/
│   │   └── style.css   # Main styles and responsive design CSS
│   ├── img/
│   │   ├── avt.jpg     # Personal avatar image
│   │   └── logo.png    # Logo image (if applicable)
│   └── js/
│       └── main.js     # Scroll animations and mobile navigation menu logic
├── CV_MaiNhatDuy_AI_Engineering.pdf  # PDF Resume
├── index.html          # Main Portfolio page
└── README.md           # This documentation
```

## Local Development
Since this is a pure static website, you can run the project easily without installing Ruby, Gemfile, or Node.js:

### Method 1: Open Directly
Double-click the `index.html` file to open it directly in any web browser.

### Method 2: Python HTTP Server (Recommended for resource path resolution)
If Python is installed on your system:
```bash
# Run HTTP Server on port 4000
python3 -m http.server 4000
```
Then visit: [http://localhost:4000](http://localhost:4000)

## Deployment
The project is configured to automatically deploy to GitHub Pages under the `mainhatduy/mainhatduy.github.io` repository whenever changes are pushed to the `main` branch.
