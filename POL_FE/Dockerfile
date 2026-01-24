FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html

# Expose port
EXPOSE 80

# Nginx runs automatically, no CMD needed