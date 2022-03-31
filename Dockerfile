FROM node:16-alpine

ENV NODE_ENV production

COPY dist/index.js .

COPY /build ./build

CMD ["node", "index.js"]

EXPOSE 8080