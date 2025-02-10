FROM node:18-alpine AS build

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install  --legacy-peer-deps
COPY . /app

RUN npm run build

#Run Steps
FROM nginx:1.19.8-alpine  
COPY --from=build-step /app/build /usr/share/nginx/html
