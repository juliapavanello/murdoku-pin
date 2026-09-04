FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7032

CMD ["npm", "start"]