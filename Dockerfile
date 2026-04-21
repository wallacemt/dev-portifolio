FROM node:22-alpine3.21  
WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY . .

ARG API_URL
ENV API_URL=$API_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]