#!/bin/sh

# Se node_modules não existir, instalar dependências
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi

# Executar o comando
exec "$@"
