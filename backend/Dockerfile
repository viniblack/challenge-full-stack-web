FROM node:22

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

COPY wait-for-it.sh .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3001

CMD ["./entrypoint.sh"]