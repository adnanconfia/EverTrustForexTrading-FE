# FROM node:22.11.0-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# Step 1: Build the React Vite app
FROM node:22.11.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "--port", "4300"]
