FROM oven/bun:canary-alpine 
WORKDIR /app

COPY package.json tsconfig.json ./
RUN bun install

COPY . .

ARG API_URL
ENV API_URL=$API_URL

RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]