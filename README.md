# 오이공작소 · 52 Project Journal

A static, multilingual journal for Gatherly and ZupZup. The site is built with Next.js static export; its output directory is `out/`.

## Local development and checks

```bash
npm ci
npm test
npm run dev
```

Open `http://localhost:3000` to choose Korean, English, or Japanese. Run `npm run build` to create the static site in `out/`; the postbuild step writes `out/ko/feed.xml`, `out/en/feed.xml`, and `out/ja/feed.xml`.

## Article lifecycle

Keep private drafts under the ignored `drafts/` directory. Do not commit draft text to this public repository. After approval, place a Markdown file under `posts/{locale}/{product}/{slug}.md`, for example `posts/ko/gatherly/weekly-planning.md`. Each published file must have `status: approved`, a title, an ISO date (`YYYY-MM-DD`), and an excerpt. Missing or invalid approval metadata excludes a file from listings, static article routes, and feeds.

Test-only synthetic articles live under `tests/fixtures/posts/`. The production loader reads only `posts/`, so fixtures never become site content.

```markdown
---
title: 글 제목
date: 2026-10-25
excerpt: 글 목록과 RSS에 표시할 짧은 소개
status: approved
---

본문을 Markdown으로 작성합니다.
```

Supported locales are `ko`, `en`, and `ja`; supported products are `gatherly` and `zupzup`.

## Static hosting preparation

The existing GitHub Pages project site is `https://genkino.github.io/52-project/`. Build it with `npm run build:github-pages`; the command sets the `/52-project` base path and writes static files to `out/`. The canonical URL defaults to the GitHub Pages address and can be overridden with `BLOG_SITE_URL`. For local development, use `npm run dev` or `npm run build` without a base path. The custom domain `blog.52proj.com` is not configured by this repository.
