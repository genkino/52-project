# 52 Project

Next.js와 GitHub Pages를 사용하여 만든 블로그입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

빌드된 파일은 `out` 폴더에 생성됩니다.

## 블로그 포스트 작성하기

이제 블로그 포스트를 작성하는 것이 훨씬 쉬워졌습니다! 

### 새 포스트 작성 방법

1. `posts/` 폴더에 새 Markdown 파일을 만듭니다 (예: `my-new-post.md`)
2. 파일 상단에 frontmatter를 작성합니다:

```markdown
---
title: 포스트 제목
date: 2026-01-20
excerpt: 포스트 요약 (선택사항)
---

여기에 포스트 내용을 Markdown 형식으로 작성합니다.

## 소제목

- 리스트 항목
- 또 다른 항목

**굵은 글씨**나 *기울임*도 사용할 수 있습니다!
```

3. 저장하면 자동으로 블로그에 표시됩니다!

### 예시

`posts/hello-world.md` 파일을 만들고:

```markdown
---
title: Hello World
date: 2026-01-20
excerpt: 첫 번째 포스트입니다.
---

안녕하세요! 이것은 첫 번째 포스트입니다.

## 소제목

이렇게 Markdown으로 쉽게 작성할 수 있습니다.
```

이제 `npm run dev`로 로컬에서 확인하거나, `npm run deploy`로 배포하면 됩니다!

## GitHub Pages에 배포하기

### 배포

```bash
npm run deploy
```

이 명령은 자동으로:
- 프로젝트를 빌드합니다
- `out` 폴더에 `.nojekyll` 파일을 생성합니다
- `gh-pages` 브랜치에 배포합니다

### GitHub Pages 활성화

1. GitHub 레포지토리로 이동: https://github.com/genkino/52-project
2. Settings > Pages
3. Source를 `gh-pages` 브랜치로 설정
4. Save

몇 분 후 `https://genkino.github.io/52-project`에서 블로그를 확인할 수 있습니다!

## 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Markdown** - 포스트 작성
- **GitHub Pages** - 호스팅

## 라이선스

MIT
