FROM node:18-alpine

WORKDIR /dist

COPY package.json ./

RUN npm install

COPY dist .

CMD ["npm", "start"]
