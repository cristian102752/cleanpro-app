# APLICAR-RAMAS.ps1
# Crea 9 ramas week-01..week-09, cada una con SOLO el código de esa semana (1 commit por rama)
# Uso: powershell -ExecutionPolicy Bypass -File .\APLICAR-RAMAS.ps1
# Debe ejecutarse en la raíz del proyecto (donde están package.json y snapshots/)

Set-Location $PSScriptRoot

$titulos = @(
  "Core Components y Flexbox ServiceCard",
  "FlatList busqueda en tiempo real y tema",
  "React Navigation Stack y Tabs params tipados",
  "Zustand favoritos con persistencia",
  "TanStack Query y Axios loading error refresh",
  "Formularios React Hook Form y Zod",
  "Persistencia local tema dinamico y vista grid",
  "Auth JWT SecureStore y Zustand",
  "Animaciones con Animated API"
)

git checkout -f main

for ($i = 1; $i -le 9; $i++) {
  $n = $i.ToString('00')
  Write-Host "=== Creando rama week-$n ===" -ForegroundColor Cyan

  git branch -D "week-$n" 2>$null
  git checkout --orphan "week-$n"

  # Reemplaza src, App.tsx y README.md con el snapshot de la semana
  Remove-Item -Recurse -Force src -ErrorAction SilentlyContinue
  Remove-Item -Force App.tsx -ErrorAction SilentlyContinue
  Remove-Item -Force README.md -ErrorAction SilentlyContinue
  Copy-Item -Recurse "snapshots\week-$n\src" "src"
  Copy-Item "snapshots\week-$n\App.tsx" "App.tsx"
  Copy-Item "snapshots\week-$n\README.md" "README.md"

  # Quita carpetas de evidencias del árbol de la rama y agrega todo lo demás
  git rm -r --cached semanas -q 2>$null
  git add -A -- . ":(exclude)snapshots" ":(exclude)semanas"
  git commit -m "feat: entrega semana $n - $($titulos[$i-1]) - CleanPro 3311987"

  git checkout -f main
}

Write-Host "=== Subiendo ramas a GitHub ===" -ForegroundColor Yellow
git push origin --all --force

Write-Host "LISTO. Ramas:" -ForegroundColor Green
git branch -a
