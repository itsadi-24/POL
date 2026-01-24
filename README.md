# POL - Paradeep Online

A full-stack e-commerce application built with React (Frontend) and Node.js/Express (Backend).

## 📁 Project Structure

This is a **monorepo** containing both frontend and backend applications:

```
POL-main/
├── POL_FE/              # Frontend (React + Vite + TypeScript)
├── POL_BE/              # Backend (Node.js + Express + MongoDB)
├── docker-compose.yml   # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Makefile            # Common commands for development
├── .env                # Environment variables
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized setup)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   - MongoDB connection string
   - Cloudinary credentials
   - JWT secret
   - Other necessary API keys

### Development (Local)

#### Backend

```bash
cd POL_BE
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

#### Frontend

```bash
cd POL_FE
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Development (Docker)

Run both frontend and backend with a single command:

```bash
# Using Docker Compose
docker-compose -f docker-compose.dev.yml up

# Or using Make
make dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Production (Docker)

Build and run production containers:

```bash
# Using Docker Compose
docker-compose up -d

# Or using Make
make up
```

- Frontend: `http://localhost:80`
- Backend: `http://localhost:5000`

## 📚 Documentation

- [Docker Setup Guide](./README.docker.md) - Detailed Docker instructions
- [Quick Start Guide](./QUICKSTART.md) - Getting started guide

## 🛠️ Available Commands

The `Makefile` provides convenient commands for common operations:

```bash
make dev          # Start development environment
make up           # Start production environment
make down         # Stop all containers
make logs         # View logs
make clean        # Clean up containers and volumes
make build        # Build Docker images
```

## 🏗️ Technology Stack

### Frontend (POL_FE)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context
- **Routing**: React Router
- **HTTP Client**: Axios

### Backend (POL_BE)
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, CORS

## 📂 Key Features

- 🛍️ Product catalog with multi-image support
- 📝 Blog management system
- 🎫 Support ticket system
- ⚙️ Admin panel with authentication
- 🔐 JWT-based authentication
- ☁️ Cloud-based image storage (Cloudinary)
- 🐳 Dockerized for easy deployment
- 📱 Responsive design

## 🔐 Initial Setup

### Create Admin User

After setting up the backend, create an admin user:

```bash
cd POL_BE
npm run seed-admin
```

### Migrate Existing Data

If you have data in `db.json`, migrate it to MongoDB:

```bash
cd POL_BE
npm run migrate
```

## 🌐 API Documentation

The backend API is available at `/api/v1/`:

- `/api/v1/products` - Product management
- `/api/v1/services` - Service management
- `/api/v1/blogs` - Blog management
- `/api/v1/tickets` - Support ticket management
- `/api/v1/settings` - Application settings
- `/api/v1/auth` - Authentication

## 📝 Git Workflow

This repository uses a monorepo structure. Both frontend and backend are managed in a single repository.

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Commit Convention

We follow conventional commits:

```
feat: add new feature
fix: bug fix
chore: maintenance tasks
docs: documentation updates
style: code formatting
refactor: code refactoring
test: adding tests
```

## 🚢 Deployment

### Using Docker

1. Build images:
   ```bash
   docker-compose build
   ```

2. Run containers:
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

#### Backend

1. Build:
   ```bash
   cd POL_BE
   npm install --production
   ```

2. Run:
   ```bash
   npm start
   ```

#### Frontend

1. Build:
   ```bash
   cd POL_FE
   npm install
   npm run build
   ```

2. Serve the `dist` folder using any static file server (nginx, serve, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Aditya Prasan

## 🆘 Support

For support, please create a ticket through the support system or contact the development team.

---

**Last Updated**: January 24, 2026
