FROM node:20-bookworm-slim AS deps

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "index.js"]
