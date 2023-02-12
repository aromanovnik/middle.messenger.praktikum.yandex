FROM node:16-alpine

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./server.js"]
