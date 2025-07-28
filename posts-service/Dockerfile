# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: ejecución
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN npm install -g ts-node typescript

CMD node dist/seeder.js && node dist/main.js
#CMD ["node", "dist/main"]
