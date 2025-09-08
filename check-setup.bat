@echo off
echo.
echo 🔍 Verificando configuración de GitHub Pages...
echo.
echo Archivos críticos:

if exist "index.html" (
    echo ✅ index.html
) else (
    echo ❌ index.html - FALTA
    set "missing=true"
)

if exist ".nojekyll" (
    echo ✅ .nojekyll
) else (
    echo ❌ .nojekyll - FALTA
    set "missing=true"
)

if exist "github-pages-config.js" (
    echo ✅ github-pages-config.js
) else (
    echo ❌ github-pages-config.js - FALTA
    set "missing=true"
)

if exist "_config.yml" (
    echo ✅ _config.yml
) else (
    echo ❌ _config.yml - FALTA
    set "missing=true"
)

if exist ".github\workflows\deploy.yml" (
    echo ✅ .github\workflows\deploy.yml
) else (
    echo ❌ .github\workflows\deploy.yml - FALTA
    set "missing=true"
)

echo.
echo Carpetas importantes:

if exist "assets" (
    echo 📁 assets\ - ENCONTRADA
) else (
    echo 📁 assets\ - NO ENCONTRADA
    set "missing=true"
)

if exist "docs" (
    echo 📁 docs\ - ENCONTRADA
) else (
    echo 📁 docs\ - NO ENCONTRADA
    set "missing=true"
)

echo.

if "%missing%"=="true" (
    echo ❌ Faltan archivos críticos. Revisa la lista anterior.
    echo 📖 Consulta README-GITHUB-PAGES-SETUP.md para más detalles.
) else (
    echo 🎉 ¡Configuración completa! Puedes subir estos archivos a GitHub.
    echo.
    echo Próximos pasos:
    echo 1. Sube todos estos archivos a la RAÍZ de tu repositorio GitHub
    echo 2. Ve a Settings ^> Pages en tu repositorio
    echo 3. Selecciona 'GitHub Actions' como fuente
    echo 4. Espera a que se ejecute el workflow
)

echo.
pause