FROM node:16.13.0

WORKDIR /var/www/app

COPY package.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./server.js"]
