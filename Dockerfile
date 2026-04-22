FROM oven/bun:canary-alpine 
WORKDIR /app

COPY package.json tsconfig.json ./
RUN bun install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]