FROM docker.nexus.snrinternal.com/synerise/base-images:nodejs22

LABEL maintainer="SYNERISE"

USER root

RUN find / -type f -iname '*apt*' -xdev -delete
RUN find / -type d -depth -iname '*apt*' -print0 -xdev | xargs -0 rm -r --

RUN sed -i -r "/^($APP_USER)/!d" /etc/group \
  && sed -i -r "/^($APP_USER)/!d" /etc/passwd

WORKDIR /app

COPY package.json ./

COPY . .

RUN yarn bootstrap

USER app

ENV PORT=9099

EXPOSE 9099

CMD ["yarn", "storybook"]
