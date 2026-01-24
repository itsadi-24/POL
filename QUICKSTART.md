# POL Application - Quick Start Guide

## 🚀 One Command to Rule Them All!

You can now run both your frontend and backend with a single command!

## Prerequisites

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Make sure Docker is running
3. Configure your environment variables

## First Time Setup

### 1. Configure Environment Variables

Edit the `.env` file in the root directory (it's already been created from your backend .env):

```bash
nano .env  # or use your favorite editor
```

Make sure these are set:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `JWT_SECRET` - A secure random string for JWT tokens

## Running the Application

### Option 1: Using Make (Recommended - Easiest!)

```bash
# Production mode (optimized build)
make prod

# Development mode (with hot-reload)
make dev

# See all available commands
make help
```

### Option 2: Using Docker Compose Directly

```bash
# Production mode
docker-compose up

# Development mode
docker-compose -f docker-compose.dev.yml up

# Run in background (detached)
docker-compose up -d
```

### Option 3: One-Line Commands

```bash
# Production
cd /home/adi-prasan/Desktop/POL-main && docker-compose up

# Development
cd /home/adi-prasan/Desktop/POL-main && docker-compose -f docker-compose.dev.yml up
```

## Access Your Application

### Production Mode:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### Development Mode:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Common Commands

### Using Make (Easy!)

```bash
# Start
make dev          # Development mode
make prod         # Production mode

# Stop
make dev-down     # Stop development
make prod-down    # Stop production

# View logs
make logs         # All services
make logs-be      # Backend only
make logs-fe      # Frontend only

# Status
make status       # Check if services are running

# Clean up
make clean        # Remove all containers and volumes
```

### Using Docker Compose

```bash
# View logs
docker-compose logs -f              # All services
docker-compose logs -f backend      # Backend only
docker-compose logs -f frontend     # Frontend only

# Stop services
docker-compose down                 # Stop and remove containers

# Rebuild
docker-compose up --build           # Rebuild and start

# Check status
docker-compose ps                   # See running containers
```

## Troubleshooting

### 1. Port Already in Use

If you get an error about ports being in use, you have two options:

**Option A**: Stop the services using those ports
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Option B**: Change ports in `docker-compose.yml`

### 2. Database Connection Issues

Make sure your MongoDB Atlas:
- Is running and accessible
- Has the correct IP whitelist (0.0.0.0/0 for development)
- Connection string in `.env` is correct

### 3. View Container Logs

```bash
make logs
# or
docker-compose logs -f
```

### 4. Fresh Start

If something isn't working, try a clean rebuild:

```bash
make clean
make prod-build
# or
docker-compose down -v
docker-compose up --build
```

## Development vs Production

### Development Mode (`make dev`)
- ✅ Hot-reload enabled
- ✅ Source code changes reflected immediately
- ✅ All dev dependencies installed
- ✅ Better debugging
- ⚠️ Slower initial build
- Frontend on port **5173**

### Production Mode (`make prod`)
- ✅ Optimized build
- ✅ Smaller image size
- ✅ Faster runtime
- ✅ Production dependencies only
- ✅ Served via Nginx
- ⚠️ No hot-reload
- Frontend on port **3000**

## What's Been Set Up

### Files Created:
```
POL-main/
├── docker-compose.yml          # Production orchestration
├── docker-compose.dev.yml      # Development orchestration
├── Makefile                    # Easy commands
├── .env                        # Your environment variables
├── .env.example                # Template for others
├── README.docker.md            # Detailed documentation
├── QUICKSTART.md              # This file!
│
├── POL_BE/
│   ├── Dockerfile             # Production backend image
│   ├── Dockerfile.dev         # Development backend image
│   └── .dockerignore          # Exclude files from build
│
└── POL_FE/
    ├── Dockerfile             # Production frontend image
    ├── Dockerfile.dev         # Development frontend image
    ├── nginx.conf             # Nginx configuration
    └── .dockerignore          # Exclude files from build
```

## Next Steps

1. **Start the application**:
   ```bash
   make dev
   ```

2. **Open your browser**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000/api/health

3. **Start coding**! Changes will hot-reload automatically in dev mode.

## Need Help?

- Check logs: `make logs`
- Check status: `make status`
- See all commands: `make help`
- Read detailed docs: `README.docker.md`

---

**That's it! You're ready to go! 🎉**

Run `make dev` and start building!
