# Docker Setup Guide

This project is containerized using Docker and Docker Compose, allowing you to run both the frontend and backend with a single command.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed (usually comes with Docker Desktop)

## Quick Start

### 1. Environment Setup

Copy the example environment file and fill in your actual values:

```bash
cp .env.example .env
```

Edit the `.env` file and provide your:
- MongoDB connection URI
- Cloudinary credentials
- JWT secret (use a strong random string)

### 2. Start the Application

Run both frontend and backend with a single command:

```bash
docker-compose up
```

Or run in detached mode (background):

```bash
docker-compose up -d
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Backend Health Check**: http://localhost:5000/api/health

## Docker Commands

### Build and start services
```bash
docker-compose up --build
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes (⚠️ WARNING: This will delete data)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild a specific service
```bash
docker-compose build backend
docker-compose build frontend
```

### Restart a specific service
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Check service status
```bash
docker-compose ps
```

### Execute commands in a running container
```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh
```

## Development vs Production

### Development Mode

For development with hot-reload, you can use Docker Compose with volume mounting. Create a `docker-compose.dev.yml`:

```bash
# Run in development mode
docker-compose -f docker-compose.dev.yml up
```

### Production Mode

The current `docker-compose.yml` is optimized for production:
- Frontend is built and served via Nginx
- Backend runs with production dependencies only
- Includes health checks and automatic restarts

## Troubleshooting

### Port Already in Use

If ports 3000 or 5000 are already in use, you can change them in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Change frontend port to 8080
  # or
  - "5001:5000"  # Change backend port to 5001
```

### Services Not Connecting

Make sure both services are on the same Docker network. They communicate using service names:
- Frontend → Backend: `http://backend:5000`
- Backend → Frontend: `http://frontend:80`

### View Container Logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Clear Everything and Start Fresh

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## Project Structure

```
POL-main/
├── POL_BE/                 # Backend Node.js application
│   ├── Dockerfile         # Backend Docker configuration
│   ├── .dockerignore      # Files to exclude from backend build
│   └── ...
├── POL_FE/                 # Frontend React application
│   ├── Dockerfile         # Frontend Docker configuration
│   ├── .dockerignore      # Files to exclude from frontend build
│   ├── nginx.conf         # Nginx configuration for serving frontend
│   └── ...
├── docker-compose.yml      # Docker Compose orchestration
├── .env                    # Environment variables (create from .env.example)
└── .env.example           # Example environment variables
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstu` |
| `JWT_SECRET` | Secret for JWT token signing | `your-random-secret-key` |

## Notes

- The frontend is configured to connect to the backend at `http://localhost:5000/api`
- MongoDB is accessed via MongoDB Atlas (cloud), not running in Docker
- Images are stored in Cloudinary (cloud), not in Docker volumes
- For development, you may want to create a separate `docker-compose.dev.yml` with volume mounts for hot-reloading

## Support

If you encounter any issues, check:
1. Docker and Docker Compose are installed and running
2. Environment variables are correctly set in `.env`
3. Ports 3000 and 5000 are available
4. MongoDB Atlas connection is accessible
5. Container logs for specific error messages
