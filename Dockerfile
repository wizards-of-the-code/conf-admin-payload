FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN yarn install --network-timeout 1000000
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app
COPY package*.json  ./
COPY .env ./

RUN yarn install --production --network-timeout 1000000
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build
