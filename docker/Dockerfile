FROM node:20-alpine as base

FROM base as pnpm

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml .npmrc ./

RUN corepack enable pnpm && pnpm i

FROM base as builder

WORKDIR /app

COPY --from=pnpm /app/node_modules ./node_modules

COPY app.config.js next.config.js postcss.config.js tailwind.config.ts package.json pnpm-lock.yaml tsconfig.json ./

COPY .env.production .env.production

COPY ./public ./public

COPY ./src ./src

RUN npm run build

FROM base as runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV NODE_ENV=production

CMD HOSTNAME=0.0.0.0 node server.js
