Sistema de Cadastro de Livros 📚
Sistema completo de gerenciamento de livros desenvolvido com Laravel 10 e Angular 14+, utilizando Docker para orquestração de serviços.

🚀 Iniciando o Projeto
⚠️ Atenção: Antes de iniciar, verifique se você possui o Docker e Docker Compose instalados e atualizados corretamente.

Execute o Docker Compose:

bash
Copiar
Editar
docker-compose up -d
Aguarde a inicialização dos serviços e acesse os sistemas:

Frontend Angular: http://localhost:4200

API Laravel: http://localhost:8000

pgAdmin: http://localhost:5050

✅ Verificação e Testes
🔧 Testes Automatizados
Laravel (Backend - PHPUnit)
Acesse o container do Laravel:

bash
Copiar
Editar
docker exec -it <nome_container_laravel> bash
Execute os testes:

bash
Copiar
Editar
php artisan test
# ou
vendor/bin/phpunit
🧪 Dica: Certifique-se de que o banco de testes está configurado corretamente no .env.testing.

Angular (Frontend - Karma/Jasmine)
Acesse o container do Angular (ou execute localmente se preferir):

bash
Copiar
Editar
docker exec -it <nome_container_angular> bash
Execute os testes:

bash
Copiar
Editar
ng test
🎯 Observação: Os testes rodam em modo watch por padrão. Para um relatório simples:

bash
Copiar
Editar
ng test --watch=false --browsers=ChromeHeadless
⚠️ Possíveis Erros Comuns
❌ Erro 502 ou tela em branco no Angular:

Verifique se o frontend foi corretamente compilado e se o container está em execução.

Rode docker logs <nome_do_container> para investigar.

❌ API Laravel retornando 500 ou rota não encontrada:

Verifique permissões das pastas:

bash
Copiar
Editar
chmod -R 775 storage bootstrap/cache
Execute:

bash
Copiar
Editar
php artisan migrate
❌ Banco de dados indisponível:

Confirme que o container postgres está ativo.

Verifique as credenciais no .env.

❌ Erro de conexão Redis:

Verifique se o serviço Redis está em execução e corretamente referenciado em CACHE_DRIVER.

🛠️ Tecnologias Utilizadas
Backend: Laravel 10 (PHP 8.2)

Frontend: Angular 14+

Banco de Dados: PostgreSQL 15

Cache: Redis

Orquestração: Docker e Docker Compose

📦 Extras
pgAdmin para administração visual do PostgreSQL

Hot reload ativado no Angular

Volumes Docker para persistência de dados
