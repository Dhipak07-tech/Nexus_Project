@echo off
echo Starting Nexus Project Services...
echo ===================================

echo [1/3] Starting PHP Backend API on port 8000...
start "PHP Backend" cmd /c "C:\xampp\php\php.exe -S localhost:8000 php-backend/index.php"

echo [2/3] Starting PHP Frontend (Companies UI) on port 8001...
start "PHP Frontend" cmd /c "cd php-frontend && C:\xampp\php\php.exe -S localhost:8001 router.php"

echo [3/3] Starting React & Node JS App on port 3001...
start "React/Node Server" cmd /c "npm run dev"

echo.
echo ===================================
echo ALL SERVERS ARE RUNNING!
echo.
echo Everything is now unified under ONE link!
echo 👉 http://localhost:3001
echo.
echo - React App: http://localhost:3001/
echo - Companies: http://localhost:3001/php-frontend/?page=companies
echo ===================================
echo Note: Three command prompt windows have opened to keep these running.
echo To stop everything, just close those three windows!
pause
