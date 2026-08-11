# ==========================================
# STAGE 1: Builder
# ==========================================
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies first (leverages Docker cache)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# ==========================================
# STAGE 2: Production
# ==========================================
FROM node:24-alpine
WORKDIR /app

# Switch to the restricted, non-root user that comes with the node image
USER node

# Copy only what we need from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./
COPY --from=builder /app/config ./config
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/repositories ./repositories
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/services ./services

EXPOSE 3000
CMD ["node", "server.js"]