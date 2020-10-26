FROM node:lts

WORKDIR /app

COPY package.json ./

COPY . .

RUN yarn bootstrap

ENV PORT=9099

EXPOSE 9099

CMD ["yarn","storybook"]

