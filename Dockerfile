FROM node:lts-alpine3.19

RUN apk add --update bash

WORKDIR /work/udemy-nestjs

RUN yarn global add @nestjs/cli
