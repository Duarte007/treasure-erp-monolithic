FROM node:14.20.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn run build

CMD ["yarn", "run", "start:prod"]
