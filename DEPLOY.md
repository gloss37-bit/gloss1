# GitHub 배포 가이드

이 문서는 구구단 산성비 게임을 GitHub에 배포하는 방법을 안내합니다.

## 사전 준비

### 1. Git 설치

Git이 설치되어 있지 않다면 다음을 수행하세요:

1. [Git 공식 웹사이트](https://git-scm.com/download/win)에서 Git for Windows를 다운로드합니다
2. 설치 파일을 실행하여 설치합니다
3. 설치 완료 후 PowerShell을 재시작합니다

설치 확인:
```bash
git --version
```

### 2. GitHub 계정 생성

1. [GitHub](https://github.com)에 접속하여 계정을 만듭니다
2. 이메일 인증을 완료합니다

## GitHub에 코드 업로드

### 1. GitHub에서 새 저장소 생성

1. GitHub에 로그인합니다
2. 우측 상단의 **+** 버튼을 클릭하고 **New repository**를 선택합니다
3. 저장소 이름을 입력합니다 (예: `gugudan-castle-defense`)
4. **Public** 또는 **Private**을 선택합니다
5. **Initialize this repository with a README**는 체크하지 않습니다
6. **Create repository**를 클릭합니다

### 2. 로컬에서 Git 저장소 초기화

프로젝트 폴더에서 다음 명령어를 실행합니다:

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋 생성
git commit -m "Initial commit: 구구단 산성비 게임"

# GitHub 저장소를 원격 저장소로 추가
# 아래 YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경하세요
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# main 브랜치로 이름 변경 (필요한 경우)
git branch -M main

# GitHub에 코드 업로드
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/yourusername/gugudan-castle-defense.git
```

## GitHub Pages에 배포

### 방법 1: GitHub Actions 사용 (권장)

이 방법은 자동으로 배포됩니다. 이미 `.github/workflows/deploy.yml` 파일이 설정되어 있습니다.

#### 1. vite.config.ts 수정

GitHub Pages에 배포하려면 `vite.config.ts`의 `base` 경로를 저장소 이름에 맞게 수정해야 합니다:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',  // 저장소 이름으로 변경
})
```

예를 들어 저장소 이름이 `gugudan-castle-defense`라면:
```typescript
base: '/gugudan-castle-defense/',
```

#### 2. GitHub Pages 설정

1. GitHub 저장소 페이지로 이동합니다
2. **Settings** 탭을 클릭합니다
3. 왼쪽 메뉴에서 **Pages**를 선택합니다
4. **Source**에서 **GitHub Actions**를 선택합니다
5. 저장합니다

#### 3. 자동 배포

이제 `main` 브랜치에 코드를 푸시하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update: 코드 수정"
git push origin main
```

배포가 완료되면 다음 주소에서 확인할 수 있습니다:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### 방법 2: gh-pages 패키지 사용

#### 1. gh-pages 설치

```bash
npm install --save-dev gh-pages
```

#### 2. package.json에 배포 스크립트 추가

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 3. vite.config.ts 수정

```typescript
base: '/your-repo-name/',
```

#### 4. 배포 실행

```bash
npm run deploy
```

## 배포 확인

배포가 완료되면 (보통 1-2분 소요):

1. GitHub 저장소의 **Actions** 탭에서 배포 진행 상황을 확인할 수 있습니다
2. 배포가 완료되면 **Settings > Pages**에서 배포된 URL을 확인할 수 있습니다
3. 브라우저에서 해당 URL로 접속하여 게임이 정상 작동하는지 확인합니다

## 문제 해결

### 배포가 실패하는 경우

1. **Actions 탭 확인**: GitHub 저장소의 Actions 탭에서 오류 메시지를 확인합니다
2. **vite.config.ts 확인**: `base` 경로가 올바른지 확인합니다
3. **빌드 오류 확인**: 로컬에서 `npm run build`가 성공하는지 확인합니다

### 페이지가 404 오류를 표시하는 경우

1. `vite.config.ts`의 `base` 경로가 저장소 이름과 일치하는지 확인합니다
2. GitHub Pages 설정에서 올바른 브랜치가 선택되었는지 확인합니다

### 이미지나 리소스가 로드되지 않는 경우

- 모든 경로가 상대 경로로 설정되어 있는지 확인합니다
- `base` 경로 설정이 올바른지 확인합니다

## 업데이트 배포

코드를 수정한 후 다시 배포하려면:

```bash
git add .
git commit -m "Update: 변경 사항 설명"
git push origin main
```

GitHub Actions가 자동으로 빌드하고 배포합니다.

## 추가 리소스

- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Git 기본 사용법](https://git-scm.com/book/ko/v2)

