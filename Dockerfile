# Dockerfile
# Build frontend first
FROM node:20-alpine as frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Build backend and copy frontend build
FROM node:20-alpine
WORKDIR /app

# Copy backend package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend files
COPY src ./src
COPY tsconfig.json ./
COPY jest.config.js ./
COPY nodemon.json ./

# Copy frontend build files
COPY --from=frontend /frontend/.next ./frontend/.next
COPY --from=frontend /frontend/public ./frontend/public

EXPOSE 5000

# Add wait tool
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start