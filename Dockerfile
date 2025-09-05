### Multi-stage Dockerfile for building React app and serving with nginx
# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build --silent

# Stage 2: nginx static server
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Small nginx config to support SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
