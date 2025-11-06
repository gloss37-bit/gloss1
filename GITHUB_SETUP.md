# GitHub 배포 빠른 가이드

## 단계별 가이드

### 1단계: Git 설치 (아직 설치하지 않은 경우)

1. [Git 다운로드](https://git-scm.com/download/win)
2. 설치 후 PowerShell 재시작

### 2단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **+** → **New repository**
3. 저장소 이름 입력 (예: `gugudan-castle-defense`)
4. **Public** 선택
5. **Create repository** 클릭

### 3단계: 저장소 이름 확인

생성한 저장소의 URL을 확인하세요:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
```

### 4단계: vite.config.ts 수정

`vite.config.ts` 파일을 열고 `base` 경로를 저장소 이름에 맞게 수정:

```typescript
base: '/YOUR_REPO_NAME/',  // 저장소 이름으로 변경
```

예시:
```typescript
base: '/gugudan-castle-defense/',
```

### 5단계: Git 초기화 및 업로드

프로젝트 폴더에서 PowerShell을 열고:

```bash
# Git 초기화
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 구구단 산성비 게임"

# 원격 저장소 추가 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 브랜치 이름 변경
git branch -M main

# GitHub에 업로드
git push -u origin main
```

### 6단계: GitHub Pages 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 선택
4. **Source**에서 **GitHub Actions** 선택
5. 저장

### 7단계: 배포 확인

1. **Actions** 탭에서 배포 진행 상황 확인
2. 배포 완료 후 (1-2분 소요) **Settings > Pages**에서 URL 확인
3. 브라우저에서 접속하여 게임 확인

배포된 URL 형식:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 문제 해결

### Git 명령어가 작동하지 않는 경우
- Git이 설치되었는지 확인: `git --version`
- PowerShell을 재시작해보세요

### 배포가 실패하는 경우
- `vite.config.ts`의 `base` 경로가 올바른지 확인
- Actions 탭에서 오류 메시지 확인
- 로컬에서 `npm run build`가 성공하는지 확인

### 페이지가 표시되지 않는 경우
- `base` 경로가 저장소 이름과 정확히 일치하는지 확인
- GitHub Pages 설정에서 GitHub Actions가 선택되었는지 확인

## 다음 업데이트 배포

코드를 수정한 후:

```bash
git add .
git commit -m "변경 사항 설명"
git push origin main
```

자동으로 배포됩니다!

