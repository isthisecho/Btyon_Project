FROM node:latest AS Production

WORKDIR /app

COPY  ./package.json ./
COPY ./yarn.lock ./



RUN yarn install

COPY . .

EXPOSE 3000

CMD ["index.js"]


