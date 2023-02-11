FROM ubuntu:18.04
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www
COPY ./dist ./
COPY ./server.js ./server.js
EXPOSE 3000
CMD node server.js
