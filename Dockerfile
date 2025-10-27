FROM node:22.3.0 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# install pnpm via npm to avoid Corepack signature/verification issues in some environments
# use --shamefully-hoist so node_modules layout is compatible when copied to the runtime stage
RUN npm install -g pnpm@latest \
	&& pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

RUN pnpm run build

FROM node:22.3.0

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "-r", "@opentelemetry/auto-instrumentations-node/register", "dist/main.js"]
