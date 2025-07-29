FROM node:20

WORKDIR /app

COPY frontendInventorySystem/package*.json ./
RUN npm install

COPY frontendInventorySystem/ .

EXPOSE 5173
