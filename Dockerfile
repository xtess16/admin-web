FROM node:13.2-alpine

WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm install -g @vue/cli
RUN npm i
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "serve"]
