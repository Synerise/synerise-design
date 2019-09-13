FROM nginx:latest

RUN mkdir -p /srv/www
WORKDIR /srv/www
COPY ngnix.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
COPY website/build /srv/www
