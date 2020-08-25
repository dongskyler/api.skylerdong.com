FROM node:current-buster-slim AS base
WORKDIR /app/

FROM base AS builder
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile --production
RUN cp -R node_modules /tmp/node_modules
RUN yarn --pure-lockfile
COPY ./ ./
RUN yarn production

FROM base
COPY --from=builder /app/.env /app/package.json ./
COPY --from=builder /tmp/node_modules/ ./node_modules/
COPY --from=builder /app/dist-server/ ./dist-server/
COPY --from=builder /app/public/ ./public/
EXPOSE 7020
CMD ["node", "/app/dist-server/bin/www.js"]
