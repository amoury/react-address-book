FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . ./

CMD ["npm", "run",  "start"]