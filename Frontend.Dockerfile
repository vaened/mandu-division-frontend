FROM node:18-alpine AS development
RUN corepack enable
RUN corepack prepare pnpm@7.18.0 --activate

ENV NODE_ENV development

WORKDIR /app

COPY package*.json .

RUN npm install

RUN mkdir -p node_modules/.cache
RUN mkdir -p node_modules/.vite/

RUN find /app -type d ! -path '/app/node_modules*' -exec chmod 777 {} +
RUN find /app -type f ! -path '/app/node_modules*' -exec chmod 777 {} +

COPY  . .

USER node
EXPOSE 3000

CMD [ "pnpm", "dev"]