# Use a lightweight node image
FROM node:24-alpine

# Set the working directory
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port 5000 (adjust if your server uses a different port)
EXPOSE 5000

CMD ["npm", "start"]