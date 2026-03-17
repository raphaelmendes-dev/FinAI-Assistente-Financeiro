# Rs4Machine - FinAI - Script de Reestruturacao
# Rodar na raiz do projeto: FinAI-Assistente-Financeiro/

Write-Host "Rs4Machine - Reestruturando FinAI..." -ForegroundColor Cyan

# 1. CRIAR PASTAS
New-Item -ItemType Directory -Force -Path "backend"
New-Item -ItemType Directory -Force -Path "frontend"
New-Item -ItemType Directory -Force -Path "frontend\app\finai"
New-Item -ItemType Directory -Force -Path "frontend\constants"
New-Item -ItemType Directory -Force -Path "frontend\styles"
New-Item -ItemType Directory -Force -Path "frontend\hooks"
New-Item -ItemType Directory -Force -Path "frontend\components\FinAI"

Write-Host "Pastas criadas" -ForegroundColor Green

# 2. MOVER BACKEND
$backendFiles = @("ai_core.py", "data_handler.py", "utils.py", "requirements.txt", ".env", ".env.exemple")
foreach ($f in $backendFiles) {
    if (Test-Path $f) {
        Move-Item -Path $f -Destination "backend\$f" -Force
        Write-Host "  moved -> backend\$f" -ForegroundColor DarkCyan
    }
}

# app.py vira backup
if (Test-Path "app.py") {
    Move-Item -Path "app.py" -Destination "backend\app_streamlit_old.py" -Force
    Write-Host "  moved -> backend\app_streamlit_old.py (backup)" -ForegroundColor DarkYellow
}

# 3. MOVER ASSETS
if (Test-Path "assets") {
    Move-Item -Path "assets" -Destination "frontend\public" -Force
    Write-Host "  moved -> frontend\public\" -ForegroundColor DarkCyan
}

Write-Host ""
Write-Host "Reestruturacao concluida!" -ForegroundColor Green
Write-Host "Cole os arquivos do frontend e backend nas pastas certas." -ForegroundColor Yellow
Write-Host ""
Write-Host "Estrutura final:" -ForegroundColor Cyan
Write-Host "  backend/  -> Python + FastAPI"
Write-Host "  frontend/ -> Next.js"
