FROM node:22.3.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22.3.0-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]