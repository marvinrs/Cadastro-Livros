#!/bin/bash

echo "🔧 Configurando Frontend..."

# Ajustar permissões
sudo chown -R $USER:$USER frontend/

# Criar estrutura de pastas
mkdir -p frontend/src/app/core/{models,services,interceptors,guards}
mkdir -p frontend/src/app/shared/{components,directives,pipes}
mkdir -p frontend/src/app/features/{auth,livros,autores,assuntos,dashboard,relatorios}

# Criar environments
mkdir -p frontend/src/environments

# Environment development
cat > frontend/src/environments/environment.ts << 'EOENV'
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1'
};
EOENV

# Environment production
cat > frontend/src/environments/environment.prod.ts << 'EOENV'
export const environment = {
  production: true,
  apiUrl: '/api/v1'
};
EOENV

echo "✅ Frontend configurado!"
