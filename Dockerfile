FROM node:latest

WORKDIR /react-docker-example/

RUN mkdir -p /react-docker-example/node_modules && chmod -R 777 /react-docker-example


COPY package.json /react-docker-example/
RUN npm install --legacy-peer-deps
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src

CMD ["npm", "start"]

