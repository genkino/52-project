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

## GitHub Pages에 배포하기

### 1. GitHub 레포지토리 생성

1. GitHub에서 새 레포지토리를 생성합니다.
2. 레포지토리 이름을 `genkino-blog`로 설정합니다 (또는 원하는 이름으로).

### 2. 프로젝트 설정

`next.config.js`에서 `basePath`와 `assetPrefix`를 레포지토리 이름에 맞게 수정하세요:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

### 3. GitHub에 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/genkino-blog.git
git push -u origin main
```

### 4. 배포

```bash
npm run deploy
```

이 명령은 자동으로:
- 프로젝트를 빌드합니다
- `out` 폴더에 `.nojekyll` 파일을 생성합니다
- `gh-pages` 브랜치에 배포합니다

### 5. GitHub Pages 활성화

1. GitHub 레포지토리로 이동
2. Settings > Pages
3. Source를 `gh-pages` 브랜치로 설정
4. Save

몇 분 후 `https://your-username.github.io/genkino-blog`에서 블로그를 확인할 수 있습니다!

## 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **GitHub Pages** - 호스팅

## 라이선스

MIT
