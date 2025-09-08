# Script de Verificación para GitHub Pages Setup
# Ejecuta este script en PowerShell para verificar que todos los archivos estén en su lugar

Write-Host "🔍 Verificando configuración de GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

# Verificar archivos críticos en la raíz
$criticalFiles = @(
    "index.html",
    ".nojekyll", 
    "github-pages-config.js",
    "_config.yml",
    ".github\workflows\deploy.yml"
)

$allGood = $true

Write-Host "Archivos críticos:" -ForegroundColor White
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - FALTA" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""
Write-Host "Carpetas importantes:" -ForegroundColor White

# Verificar carpetas importantes
if (Test-Path "assets" -PathType Container) {
    $assetCount = (Get-ChildItem "assets" -Recurse -File).Count
    Write-Host "📁 assets/ ($assetCount archivos)" -ForegroundColor Yellow
} else {
    Write-Host "📁 assets/ - NO ENCONTRADA" -ForegroundColor Red
    $allGood = $false
}

if (Test-Path "docs" -PathType Container) {
    $docsCount = (Get-ChildItem "docs" -Recurse -File).Count
    Write-Host "📁 docs/ ($docsCount archivos)" -ForegroundColor Yellow
} else {
    Write-Host "📁 docs/ - NO ENCONTRADA" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# Verificar contenido de index.html
if (Test-Path "index.html") {
    $indexContent = Get-Content "index.html" -Raw
    if ($indexContent -match "github-pages-config.js") {
        Write-Host "✅ index.html incluye github-pages-config.js" -ForegroundColor Green
    } else {
        Write-Host "⚠️  index.html NO incluye github-pages-config.js" -ForegroundColor Yellow
    }
}

Write-Host ""

if ($allGood) {
    Write-Host "🎉 ¡Configuración completa! Puedes subir estos archivos a GitHub." -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "1. Sube todos estos archivos a la RAÍZ de tu repositorio GitHub"
    Write-Host "2. Ve a Settings > Pages en tu repositorio"
    Write-Host "3. Selecciona 'GitHub Actions' como fuente"
    Write-Host "4. Espera a que se ejecute el workflow"
} else {
    Write-Host "❌ Faltan archivos críticos. Revisa la lista anterior." -ForegroundColor Red
    Write-Host "📖 Consulta README-GITHUB-PAGES-SETUP.md para más detalles." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Presiona Enter para continuar..."
Read-Host