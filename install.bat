@echo off
chcp 65001 >nul
echo ====================================
echo   ProjectPromptAi 설치 및 실행 가이드
echo ====================================
echo.
echo 이 프로젝트는 별도의 설치가 필요 없는 정적 웹 사이트입니다.
echo 브라우저에서 index.html을 열면 즉시 실행됩니다.
echo.
echo [1/1] 로컬 웹 서버 실행 시 필요한 Python 확인 중...
python --version >nul 2>&1
if errorlevel 1 (
    echo [정보] Python이 설치되어 있지 않습니다. 
    echo 그냥 index.html 파일을 더블클릭하여 바로 사용하실 수 있습니다.
) else (
    echo [정보] Python이 감지되었습니다. run.bat을 통해 로컬 서버를 열 수 있습니다.
)
echo.
echo 설치 프로세스 완료!
pause
