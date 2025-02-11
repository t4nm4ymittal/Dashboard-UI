FROM node:latest

WORKDIR /react-docker-example/

COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/

RUN npm install --legacy-peer-deps
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

CMD ["npm", "start"]
