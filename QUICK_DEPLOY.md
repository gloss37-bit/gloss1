# 빠른 배포 가이드

## 방법 1: 배치 스크립트 사용 (가장 쉬움)

1. **Git 설치** (아직 안 했다면)
   - https://git-scm.com/download/win 에서 다운로드
   - 설치 후 컴퓨터 재시작

2. **Personal Access Token 생성** (필수!)
   - https://github.com/settings/tokens 접속
   - **Generate new token (classic)** 클릭
   - Note: "구구단 게임"
   - Expiration: 90일
   - Scopes: `repo` (전체), `workflow` 체크
   - **Generate token** 클릭
   - ⚠️ 토큰을 복사해 안전한 곳에 보관!

3. **배치 스크립트 실행**
   - `deploy-to-github.bat` 파일을 더블클릭
   - 또는 PowerShell에서 실행:
     ```bash
     .\deploy-to-github.bat
     ```

4. **GitHub에 푸시**
   - 스크립트가 끝나면 다음 명령어 실행:
     ```bash
     git push -u origin main
     ```
   - Username: `gloss37-bit`
   - Password: **생성한 Personal Access Token** 입력

5. **GitHub Pages 활성화**
   - https://github.com/gloss37-bit/gloss1 접속
   - Settings → Pages
   - Source: **GitHub Actions** 선택
   - 저장

## 방법 2: 수동 명령어 실행

Git이 설치되어 있다면 PowerShell에서 직접 실행:

```bash
# 1. Git 초기화
git init

# 2. 사용자 정보 설정
git config user.name "gloss37-bit"
git config user.email "gloss37@gmail.com"

# 3. 파일 추가
git add .

# 4. 커밋
git commit -m "Initial commit: 구구단 산성비 게임"

# 5. 원격 저장소 추가
git remote add origin https://github.com/gloss37-bit/gloss1.git

# 6. 브랜치 이름 변경
git branch -M main

# 7. 푸시 (토큰 입력 필요)
git push -u origin main
```

## 방법 3: GitHub Desktop 사용 (GUI)

1. GitHub Desktop 다운로드: https://desktop.github.com/
2. 설치 후 로그인
3. File → Add Local Repository
4. 프로젝트 폴더 선택
5. Publish repository 클릭
6. Settings → Pages에서 GitHub Actions 선택

## 배포 확인

배포가 완료되면 (1-2분 소요):
- https://gloss37-bit.github.io/gloss1/ 에서 게임 확인 가능

## 문제 해결

### "git 명령어를 찾을 수 없습니다"
→ Git을 설치하고 컴퓨터를 재시작하세요

### "인증 실패" 오류
→ Personal Access Token을 사용해야 합니다 (비밀번호 아님!)

### "저장소가 이미 존재합니다" 오류
→ 다음 명령어로 해결:
```bash
git remote remove origin
git remote add origin https://github.com/gloss37-bit/gloss1.git
```

