FROM node:19.5.0-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "dev"]