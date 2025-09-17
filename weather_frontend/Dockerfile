# Angular dev-friendly Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source
COPY . .

# Expose Angular dev server port (configured to 3000 in package.json/angular.json)
EXPOSE 3000

# Default command: start Angular dev server (preview systems expect a long-running process)
CMD ["npm", "start"]

# Production build stage (optional)
FROM node:20-alpine AS prod-build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build

# Optional production runtime using a tiny static server
# Uncomment to use NGINX-based static serving.
# FROM nginx:alpine AS prod
# COPY --from=prod-build /app/dist/weather-frontend/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
