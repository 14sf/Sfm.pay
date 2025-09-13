#!/bin/bash

echo "🔧 Correction du chemin dans index.html..."

# Vérifie et modifie le chemin dans index.html
if [ -f project/index.html ]; then
  if grep -q 'src="/src/main.tsx"' project/index.html; then
    sed -i.bak 's|src="/src/main.tsx"|src="src/main.tsx"|g' project/index.html
    echo "✅ Chemin corrigé dans project/index.html"
  else
    echo "ℹ️ Aucun changement requis dans index.html"
  fi
else
  echo "❌ Fichier index.html introuvable"
fi

echo "🔧 Vérification ou ajout de base: './' dans vite.config.ts..."

# Vérifie et ajoute/modifie base dans vite.config.ts
if [ -f project/vite.config.ts ]; then
  if grep -q 'base:' project/vite.config.ts; then
    sed -i.bak "s|base:.*|base: './',|g" project/vite.config.ts
    echo "✅ Champ 'base' mis à jour"
  else
    sed -i.bak "/defineConfig({/a\\
  base: './',
" project/vite.config.ts
    echo "✅ Champ 'base' ajouté"
  fi
else
  echo "❌ Fichier vite.config.ts introuvable"
fi

echo ""
echo "✅ Terminé. Exécutez maintenant :"
echo "   git add . && git commit -m \"Fix import path and Vite base for Netlify\" && git push"