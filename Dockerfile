FROM node:22.13.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["yarn",  "preview"]