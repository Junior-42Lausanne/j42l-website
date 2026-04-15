# Builder
FROM node:22-alpine AS build

RUN apk add --no-cache \
  build-base gcc autoconf automake \
  zlib-dev libpng-dev nasm bash vips-dev git
ENV NODE_ENV=production

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 60000 && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm ci --only=production
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build

# Runer
FROM node:22-alpine

RUN apk add --no-cache vips-dev
ENV NODE_ENV=production

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]