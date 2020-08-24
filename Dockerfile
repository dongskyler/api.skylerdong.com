FROM node:current-buster-slim AS base
WORKDIR /app/

FROM base AS development
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile --production
RUN cp -R node_modules /tmp/node_modules
RUN yarn --pure-lockfile
COPY ./ ./

FROM development AS builder
RUN yarn production

FROM base AS production
COPY --from=builder /app/package.json ./
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /app/dist-server ./dist-server
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./
EXPOSE 7020
CMD ["node", "/app/dist-server/bin/www.js"]
