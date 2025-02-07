FROM quay.io/synerise/base-images:nginx-v1.0.0

USER root

COPY nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf && chmod -R 777 /etc/nginx

RUN find / -type f -iname '*apt*' -xdev -delete
RUN find / -type d -depth -iname '*apt*' -print0 -xdev | xargs -0 rm -r --

RUN sed -i -r "/^($APP_USER)/!d" /etc/group \
  && sed -i -r "/^($APP_USER)/!d" /etc/passwd

USER $APP_USER

WORKDIR ${APP_DIR}

COPY storybook-build /srv/www
