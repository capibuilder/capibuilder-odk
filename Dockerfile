FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json yarn.lock* ./

RUN npm install

FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock* ./

RUN npm install

COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

ENV PORT=3000

COPY --from=builder /app/public ./public

COPY --from=builder  /app/.next/standalone ./

COPY --from=builder  /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
