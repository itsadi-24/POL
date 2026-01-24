.PHONY: help up down build logs clean dev dev-down prod prod-down restart status

# Default target
help:
	@echo "POL Application - Docker Commands"
	@echo "=================================="
	@echo ""
	@echo "Production Mode:"
	@echo "  make prod          - Start production environment (frontend + backend)"
	@echo "  make prod-down     - Stop production environment"
	@echo "  make prod-build    - Build and start production environment"
	@echo ""
	@echo "Development Mode:"
	@echo "  make dev           - Start development environment with hot-reload"
	@echo "  make dev-down      - Stop development environment"
	@echo "  make dev-build     - Build and start development environment"
	@echo ""
	@echo "General Commands:"
	@echo "  make logs          - View logs from all services"
	@echo "  make logs-be       - View backend logs only"
	@echo "  make logs-fe       - View frontend logs only"
	@echo "  make status        - Check status of services"
	@echo "  make restart       - Restart all services"
	@echo "  make clean         - Stop and remove all containers, networks, and volumes"
	@echo "  make shell-be      - Open shell in backend container"
	@echo "  make shell-fe      - Open shell in frontend container"

# Production commands
prod:
	@echo "🚀 Starting production environment..."
	docker compose up

prod-down:
	@echo "🛑 Stopping production environment..."
	docker compose down

prod-build:
	@echo "🔨 Building and starting production environment..."
	docker compose up --build

# Development commands
dev:
	@echo "🔧 Starting development environment..."
	docker compose -f docker-compose.dev.yml up

dev-down:
	@echo "🛑 Stopping development environment..."
	docker compose -f docker-compose.dev.yml down

dev-build:
	@echo "🔨 Building and starting development environment..."
	docker compose -f docker-compose.dev.yml up --build

# Utility commands
logs:
	docker compose logs -f

logs-be:
	docker compose logs -f backend

logs-fe:
	docker compose logs -f frontend

status:
	@echo "📊 Service Status:"
	@docker compose ps

restart:
	@echo "🔄 Restarting all services..."
	docker compose restart

clean:
	@echo "🧹 Cleaning up Docker resources..."
	@docker compose down -v
	@docker compose -f docker-compose.dev.yml down -v
	@echo "✅ Cleanup complete!"

shell-be:
	@echo "🐚 Opening shell in backend container..."
	docker compose exec backend sh

shell-fe:
	@echo "🐚 Opening shell in frontend container..."
	docker compose exec frontend sh

# Setup command
setup:
	@echo "⚙️  Setting up environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✅ Created .env file. Please edit it with your configuration."; \
	else \
		echo "ℹ️  .env file already exists."; \
	fi
