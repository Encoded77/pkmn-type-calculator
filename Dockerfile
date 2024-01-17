FROM nginx:alpine

WORKDIR /app

COPY . .

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN apk add --update yarn

RUN yarn install

RUN yarn build
