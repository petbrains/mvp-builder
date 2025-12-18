@echo off
setlocal enabledelayedexpansion

:: MVP Builder Installer for Windows CMD
:: Usage: curl -fsSL https://raw.githubusercontent.com/petbrains/mvp-builder/main/scripts/install.cmd -o install.cmd && install.cmd && del install.cmd

set REPO=petbrains/mvp-builder
set BRANCH=main

echo.
echo MVP Builder Installer
echo.

:: Check for existing files
set EXISTING=
if exist ".claude" set EXISTING=!EXISTING! .claude
if exist "CLAUDE.md" set EXISTING=!EXISTING! CLAUDE.md
if exist ".mcp.json" set EXISTING=!EXISTING! .mcp.json

if not "!EXISTING!"=="" (
    echo Warning: Found existing files:!EXISTING!
    echo.
    set /p CONFIRM="Overwrite? (y/N) "
    if /i not "!CONFIRM!"=="y" (
        echo Cancelled.
        exit /b 1
    )
)

:: Create temp directory
set TEMP_DIR=%TEMP%\mvp-builder-install-%RANDOM%
mkdir "%TEMP_DIR%" 2>nul

:: Download repository
echo Downloading from GitHub...
curl -fsSL "https://github.com/%REPO%/archive/refs/heads/%BRANCH%.zip" -o "%TEMP_DIR%\repo.zip"
if errorlevel 1 (
    echo Error: Failed to download repository
    rmdir /s /q "%TEMP_DIR%" 2>nul
    exit /b 1
)

:: Extract using PowerShell (available on all modern Windows)
echo Extracting...
powershell -Command "Expand-Archive -Path '%TEMP_DIR%\repo.zip' -DestinationPath '%TEMP_DIR%' -Force"
if errorlevel 1 (
    echo Error: Failed to extract archive
    rmdir /s /q "%TEMP_DIR%" 2>nul
    exit /b 1
)

:: Find extracted folder
for /d %%D in ("%TEMP_DIR%\mvp-builder-*") do set EXTRACTED_DIR=%%D

if not defined EXTRACTED_DIR (
    echo Error: Could not find extracted directory
    rmdir /s /q "%TEMP_DIR%" 2>nul
    exit /b 1
)

:: Copy files
echo Copying files...

if exist "%EXTRACTED_DIR%\.claude" (
    if exist ".claude" rmdir /s /q ".claude"
    xcopy /s /e /i /q "%EXTRACTED_DIR%\.claude" ".claude" >nul
    echo    + .claude
)

if exist "%EXTRACTED_DIR%\CLAUDE.md" (
    copy /y "%EXTRACTED_DIR%\CLAUDE.md" "CLAUDE.md" >nul
    echo    + CLAUDE.md
)

if exist "%EXTRACTED_DIR%\.mcp.json" (
    copy /y "%EXTRACTED_DIR%\.mcp.json" ".mcp.json" >nul
    echo    + .mcp.json
)

:: Cleanup
rmdir /s /q "%TEMP_DIR%" 2>nul

echo.
echo MVP Builder installed!
echo.
echo Next steps:
echo    1. Run /docs:prd to define your product
echo    2. Run /docs:feature to generate specifications
echo.