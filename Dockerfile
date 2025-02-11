FROM node:latest

WORKDIR /react-docker-example/

# Set correct permissions for node_modules
RUN mkdir -p /react-docker-example/node_modules && chmod -R 777 /react-docker-example

COPY package.json package-lock.json* /react-docker-example/

RUN npm install --legacy-peer-deps

COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src

# Ensure the app runs on all network interfaces
ENV HOST 0.0.0.0
EXPOSE 8080

CMD ["npm", "start"]
