.PHONY: help
help:
	@echo "Comandos disponíveis:"
	@echo "  make setup       - Configuração inicial"
	@echo "  make start       - Iniciar containers"
	@echo "  make stop        - Parar containers"
	@echo "  make restart     - Reiniciar containers"
	@echo "  make logs        - Ver logs"
	@echo "  make test        - Executar testes"
	@echo "  make test-back   - Testes do backend"
	@echo "  make test-front  - Testes do frontend"
	@echo "  make migrate     - Executar migrations"
	@echo "  make seed        - Popular banco de dados"
	@echo "  make fresh       - Recriar banco de dados"
	@echo "  make shell-api   - Acessar shell da API"
	@echo "  make shell-db    - Acessar PostgreSQL"
	@echo "  make clean       - Limpar containers e volumes"

setup:
	@./setup.sh

start:
	@docker-compose up -d

stop:
	@docker-compose stop

restart: stop start

logs:
	@docker-compose logs -f

test: test-back test-front

test-back:
	@docker-compose exec api php artisan test

test-front:
	@docker-compose exec frontend npm test

migrate:
	@docker-compose exec api php artisan migrate

seed:
	@docker-compose exec api php artisan db:seed

fresh:
	@docker-compose exec api php artisan migrate:fresh --seed

shell-api:
	@docker-compose exec api bash

shell-db:
	@docker-compose exec postgres psql -U postgres cadastro_livros_db

clean:
	@docker-compose down -v
	@docker system prune -f
