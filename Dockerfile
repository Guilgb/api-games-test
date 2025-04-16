FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY . .

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]