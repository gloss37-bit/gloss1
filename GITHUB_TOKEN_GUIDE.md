# GitHub Personal Access Token 생성 가이드

⚠️ **중요**: GitHub는 2021년부터 비밀번호 인증을 중단했습니다. Personal Access Token을 사용해야 합니다.

## Personal Access Token 생성 방법

### 1. GitHub에서 Token 생성

1. [GitHub](https://github.com)에 로그인합니다
2. 우측 상단 프로필 아이콘 클릭 → **Settings**
3. 왼쪽 메뉴 맨 아래 **Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token** → **Generate new token (classic)** 클릭
6. 다음 정보 입력:
   - **Note**: "구구단 게임 배포" (원하는 이름)
   - **Expiration**: 원하는 만료 기간 선택 (90일 권장)
   - **Select scopes**: 
     - ✅ `repo` (전체 체크)
     - ✅ `workflow` (GitHub Actions 사용 시)
7. **Generate token** 클릭
8. **⚠️ 중요**: 생성된 토큰을 복사해 안전한 곳에 보관하세요 (다시 볼 수 없습니다!)

### 2. Git 자격증명 설정

PowerShell에서 다음 명령어를 실행합니다:

```bash
git config --global user.name "gloss37-bit"
git config --global user.email "gloss37@gmail.com"
```

### 3. 원격 저장소 추가 및 푸시

```bash
# Git 초기화 (아직 안 했다면)
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 구구단 산성비 게임"

# 원격 저장소 추가
git remote add origin https://github.com/gloss37-bit/gloss1.git

# 브랜치 이름 변경
git branch -M main

# 푸시 (토큰 사용)
git push -u origin main
```

**푸시할 때 비밀번호 입력란에:**
- Username: `gloss37-bit`
- Password: **생성한 Personal Access Token** (비밀번호가 아님!)

### 4. Windows 자격증명 관리자 사용 (권장)

토큰을 매번 입력하지 않으려면:

1. 푸시할 때 토큰을 입력하면 Windows가 자동으로 저장합니다
2. 또는 수동으로 저장:
   - Windows 검색에서 "자격 증명 관리자" 실행
   - **Windows 자격 증명** → **일반 자격 증명 추가**
   - 인터넷 주소: `git:https://github.com`
   - 사용자 이름: `gloss37-bit`
   - 비밀번호: **Personal Access Token**

## 보안 주의사항

⚠️ **절대 하지 말아야 할 것:**
- 비밀번호를 코드나 문서에 저장하지 마세요
- Personal Access Token을 GitHub에 커밋하지 마세요
- 토큰을 다른 사람과 공유하지 마세요

✅ **안전한 방법:**
- Personal Access Token 사용
- 토큰은 로컬에만 보관
- 만료 기간 설정
- 필요시 토큰 즉시 삭제 가능

