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

## Production deployment

The public site is served from Cloudflare Pages at `https://blog.52proj.com`. The repository's `Deploy blog to Cloudflare Pages` GitHub Actions workflow is manual-only: choose **Run workflow** on the `main` branch. It runs `npm ci`, the article approval tests, and a static build before deploying `out/` to the existing `52project-blog` Pages project. The production GitHub environment supplies the non-secret `CLOUDFLARE_ACCOUNT_ID` variable and the `CLOUDFLARE_API_TOKEN` secret. The secret is passed only to the final deployment step.

The earlier GitHub Pages build command remains available for the legacy Pages copy. The production workflow does not set a base path and uses `BLOG_SITE_URL=https://blog.52proj.com` for canonical URLs and RSS links.

### Triggering from 52web Codex cloud

When a 52web Codex task has access to `genkino/52-project` and permission to run its GitHub Actions workflows, it can request the same manual deployment with the existing GitHub CLI authentication:

```bash
gh workflow run deploy-pages.yml --repo genkino/52-project --ref main
```

This only dispatches the workflow; Cloudflare credentials remain in the `production` environment and are never copied into the Codex environment. The registered 52web repository and its GitHub permissions must include `genkino/52-project` for this command to work. Do not add a repository or broaden permissions without approval.
