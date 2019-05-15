FROM node:8.16.0-alpine AS build

RUN apk add --update --no-cache \
    python \
    make \
    g++

WORKDIR /src

COPY . .

ENV NODE_ENV=production

RUN npm ci

RUN npm prune --production

FROM node:8.16.0-alpine

ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /usr/src/app

COPY --from=build /src .

USER node

CMD ["npm", "start"]