FROM node:latest

WORKDIR /app

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3001
