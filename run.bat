@echo off
chcp 65001 >nul
echo ====================================
echo   ProjectPromptAi 로컬 실행
echo ====================================
echo.
echo Python을 사용하여 로컬 웹 서버를 실행합니다...
echo 브라우저에서 자동으로 열리지 않으면 아래 주소로 접속하세요:
echo http://localhost:8080
echo.

REM Python 3.x http.server 실행
start "" http://localhost:8080
python -m http.server 8080
pause
