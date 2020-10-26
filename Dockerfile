FROM node:12

WORKDIR /app

COPY package.json ./

COPY . .

RUN yarn install

RUN yarn bootstrap

ENV PORT=9099

EXPOSE 9099

CMD ["yarn","storybook"]

