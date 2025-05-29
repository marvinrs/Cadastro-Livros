# 📚 Sistema de Cadastro de Livros

Sistema web completo para gerenciamento de livros, autores e assuntos, desenvolvido com Laravel 10 (PHP 8.2) e Angular 14+, utilizando Docker para orquestração dos serviços.

---

## 🚀 Tecnologias Utilizadas

### Backend
- PHP 8.2 com Laravel 10
- PostgreSQL 15 (banco de dados principal)
- Redis (cache e filas)
- Docker (containerização)
- PHPUnit/Pest (testes automatizados)
- Nginx (proxy reverso)
- Supervisor (gerenciamento de processos)

### Frontend
- Angular 14+ com Angular CLI
- Angular Material (componentes UI)
- Bootstrap 5 (estilização adicional)
- TypeScript
- RxJS (programação reativa)

---

## 📋 Funcionalidades

- ✅ CRUD completo de livros, autores e assuntos
- 🔁 Relacionamentos N:N entre livros/autores e livros/assuntos
- 📊 Geração de relatórios em PDF e Excel
- 🔍 Busca avançada com filtros
- 💰 Formatação monetária em Real (R$)
- 📱 Interface responsiva
- ♻️ Cache com Redis
- 📝 Auditoria de alterações
- 🚦 Validações robustas
- 🌐 API RESTful documentada (Swagger/OpenAPI)

---

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Docker e Docker Compose
- Git

### Passo a passo

```bash
git clone https://github.com/seu-usuario/cadastro-livros.git
cd cadastro-livros
cp backend/.env.example backend/.env
docker-compose up -d
docker-compose exec api php artisan migrate
docker-compose exec api php artisan key:generate
docker-compose exec api php artisan db:seed
```

### Acesse os sistemas

- Frontend Angular: http://localhost
- API Laravel: http://localhost/api
- pgAdmin: http://localhost:5050
- Email: admin@cadastrolivros.com
- Senha: admin123

---

## 🧪 Testes

### Backend (Laravel - PHPUnit)

```bash
docker-compose exec api php artisan test
```

### Frontend (Angular - Karma/Jasmine)

```bash
docker-compose exec frontend npm test
```

### Testes de Integração

```bash
docker-compose exec api php artisan test --testsuite=Feature
```

---

## 🧠 Modelagem de Dados

### Diagrama ER

```
AUTORES ─── LIVRO_AUTOR ─── LIVROS ─── LIVRO_ASSUNTO ─── ASSUNTOS
```

### Views principais

- `vw_relatorio_livros`: Dados completos para relatório
- `vw_estatisticas`: Estatísticas gerais
- `vw_livros_completo`: Livros com autores/assuntos concatenados

### Procedures e Triggers

- `sp_inserir_livro_completo`: Insere livro com relacionamentos
- `fn_atualizar_livro_completo`: Atualiza livro e relacionamentos
- `tr_auditoria_*`: Auditoria automática
- `tr_update_timestamp_*`: Atualização automática de timestamps

---

## 🔐 Segurança

- Validação em múltiplas camadas
- Proteção contra SQL Injection (Eloquent ORM)
- CSRF Protection
- Rate Limiting
- Sanitização de inputs
- Headers de segurança via Nginx

---

## 🚀 Performance

- Redis para cache e filas
- Índices otimizados
- Lazy loading de relacionamentos
- Paginação server-side
- Compressão de assets
- CDN para bibliotecas externas

---

## 🔧 Endpoints da API

Consulte `/api/documentation` (Swagger) para a documentação completa.

---

## 🧭 Estrutura do Projeto

```
cadastro-livros/
├── backend/         # API Laravel
├── frontend/        # Angular
├── nginx/           # Configurações do Nginx
├── database/        # Scripts SQL
└── docker-compose.yml
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`)
4. Push na branch (`git push origin feature/NovaFuncionalidade`)
5. Crie um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

---

## 👥 Autores

- Marvin Santos - Desenvolvimento inicial

---

## 🙏 Agradecimentos

- Comunidade Laravel
- Equipe do Angular
- Comunidade Docker
