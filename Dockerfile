FROM node:18-buster

WORKDIR /app

COPY ./package.json ./app
COPY yarn.lock /app

RUN yarn install
COPY . /app

RUN yarn build

CMD ["yarn", "start"]
