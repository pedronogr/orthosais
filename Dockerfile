FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public
COPY next.config.ts ./

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"] 