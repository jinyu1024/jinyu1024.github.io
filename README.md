# Jinyu Liu Academic Homepage

This repository contains a clean, single-page academic homepage for GitHub Pages.

Live site target:

```text
https://jinyu1024.github.io/
```

## Project Structure

```text
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/profile.png
├── _data/
│   ├── publications.yml
│   └── news.yml
├── publications.bib
├── _config.yml
└── .nojekyll
```

## Update the Profile Photo

Place your profile image at:

```text
assets/img/profile.png
```

If the file is missing, the homepage automatically shows a clean placeholder.

## Update Publications

Publication content is shown in `index.html`. A bibliography copy is stored in:

- `publications.bib`

Optional structured publication metadata is also kept in:

```text
_data/publications.yml
```

When adding PDF links, replace the `PDF` tag in `index.html` with a real link.

## Update News

Edit the News section in `index.html`. Put news photos at these paths:

```text
assets/img/news-cast-young-talent-2026.jpg
assets/img/news-ccf-sensing-forum.jpg
assets/img/news-rafc-2025.jpg
assets/img/news-national-scholarship.jpg
```

If a photo is missing, the homepage shows a clean placeholder. A structured copy is also available in:

```text
_data/news.yml
```

Keep news items short, compact, and reverse chronological. The carousel shows three items at once on desktop; if you add more than three items, the left and right buttons will scroll through them.

## Deploy with GitHub Pages

1. Create a GitHub repository named `jinyu1024.github.io`.
2. Upload or push these files to the repository's `main` branch.
3. Open the repository on GitHub.
4. Go to `Settings` → `Pages`.
5. Set the source to `Deploy from a branch`.
6. Select `main` and `/ (root)`.
7. Visit `https://jinyu1024.github.io/` after GitHub finishes deployment.

Because this site is static HTML/CSS/JS, it does not require a build step.

## Local Preview

From the repository folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```
