.PHONY: help up down build logs clean restart status shell-be shell-fe setup

# Default target
help:
	@echo "POL Application - Docker Commands"
	@echo "=================================="
	@echo ""
	@echo "Commands:"
	@echo "  make up            - Start the application"
	@echo "  make down          - Stop the application"
	@echo "  make build         - Build and start the application"
	@echo "  make logs          - View logs from all services"
	@echo "  make logs-be       - View backend logs only"
	@echo "  make logs-fe       - View frontend logs only"
	@echo "  make status        - Check status of services"
	@echo "  make restart       - Restart all services"
	@echo "  make clean         - Stop and remove all containers, networks, and volumes"
	@echo "  make shell-be      - Open shell in backend container"
	@echo "  make shell-fe      - Open shell in frontend container"
	@echo "  make setup         - Create .env file from .env.example"

# Main commands
up:
	@echo "🚀 Starting application..."
	docker compose up

down:
	@echo "🛑 Stopping application..."
	docker compose down

build:
	@echo "🔨 Building and starting application..."
	docker compose up --build

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
