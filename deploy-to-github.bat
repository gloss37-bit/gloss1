@echo off
chcp 65001 >nul
echo ========================================
echo 구구단 산성비 게임 - GitHub 배포 스크립트
echo ========================================
echo.

REM Git 설치 확인
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo.
    echo Git을 설치해주세요:
    echo https://git-scm.com/download/win
    echo.
    echo 설치 후 이 스크립트를 다시 실행하세요.
    pause
    exit /b 1
)

echo [1/6] Git 초기화 중...
if exist .git (
    echo Git 저장소가 이미 초기화되어 있습니다.
) else (
    git init
    if %errorlevel% neq 0 (
        echo [오류] Git 초기화 실패
        pause
        exit /b 1
    )
)

echo [2/6] Git 사용자 정보 설정 중...
git config user.name "gloss37-bit"
git config user.email "gloss37@gmail.com"

echo [3/6] 파일 추가 중...
git add .
if %errorlevel% neq 0 (
    echo [오류] 파일 추가 실패
    pause
    exit /b 1
)

echo [4/6] 커밋 생성 중...
git commit -m "Initial commit: 구구단 산성비 게임"
if %errorlevel% neq 0 (
    echo [경고] 커밋 실패 또는 변경사항이 없습니다.
)

echo [5/6] 원격 저장소 설정 중...
git remote remove origin 2>nul
git remote add origin https://github.com/gloss37-bit/gloss1.git
if %errorlevel% neq 0 (
    echo [오류] 원격 저장소 설정 실패
    pause
    exit /b 1
)

echo [6/6] 브랜치 이름 변경 중...
git branch -M main

echo.
echo ========================================
echo 준비 완료!
echo ========================================
echo.
echo 이제 다음 명령어로 GitHub에 업로드하세요:
echo.
echo   git push -u origin main
echo.
echo 비밀번호 입력란에는 GitHub Personal Access Token을 입력하세요.
echo (비밀번호가 아닙니다!)
echo.
echo Personal Access Token 생성 방법:
echo https://github.com/settings/tokens
echo.
echo 토큰 생성 시 'repo'와 'workflow' 권한을 체크하세요.
echo.
pause

