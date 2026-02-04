# Builder
FROM node:22-alpine AS build

RUN apk add --no-cache \
  build-base gcc autoconf automake \
  zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Runer
FROM node:22-alpine

RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

WORKDIR /opt/app

COPY --from=build /opt/app ./

ENV PATH=/opt/app/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app

USER node

EXPOSE 1337

CMD ["yarn", "start"]

