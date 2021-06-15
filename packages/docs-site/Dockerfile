FROM nginx:latest
EXPOSE 8080

# Create our own app user and dirs
ENV APP_USER=app
ENV APP_DIR="/srv/www"
RUN mkdir "$APP_DIR" && groupadd $APP_USER && useradd -g $APP_USER -d $APP_DIR -s /sbin/nologin $APP_USER

RUN chown -R $APP_USER:$APP_USER "$APP_DIR" && chmod 755 "$APP_DIR"

RUN apt-get -y update && apt-get -y upgrade

# Remove existing crontabs, if any.
RUN rm -fr /var/spool/cron \
	&& rm -fr /etc/crontabs \
	&& rm -fr /etc/periodic

# Remove all but a handful of admin commands.
RUN find /sbin /usr/sbin \
  ! -type d -a ! -name apt -a ! -name ln -a \
  -delete

RUN find / -xdev -type d -perm /0002 -exec chmod o-w {} + \
	&& find / -xdev -type f -perm /0002 -exec chmod o-w {} + \
	&& chmod 777 /tmp/ \
  && chown $APP_USER:root /tmp/

# Remove unnecessary accounts, excluding current app user and root
RUN sed -i -r "/^($APP_USER|root)/!d" /etc/group \
  && sed -i -r "/^($APP_USER|root)/!d" /etc/passwd

# Remove interactive login shell for everybody
RUN sed -i -r 's#^(.*):[^:]*$#\1:/sbin/nologin#' /etc/passwd

# Disable password login for everybody
RUN while IFS=: read -r username _; do passwd -l "$username"; done < /etc/passwd || true

# Remove temp shadow,passwd,group
RUN find /bin /etc /lib /sbin /usr -xdev -type f -regex '.*-$' -exec rm -f {} +

# Ensure system dirs are owned by root and not writable by anybody else.
RUN find /bin /etc /lib /sbin /usr -xdev -type d \
  -exec chown root:root {} \; \
  -exec chmod 0755 {} \;

# Remove suid & sgid files
RUN find /bin /etc /lib /sbin /usr -xdev -type f -a \( -perm /4000 -o -perm /2000 \) -delete

# Remove dangerous commands
RUN find /bin /etc /lib /sbin /usr -xdev \( \
  -iname hexdump -o \
  -iname chgrp -o \
  -iname ln -o \
  -iname od -o \
  -iname strings -o \
  -iname su -o \
  -iname sudo -o \
  -iname curl -o \
  -iname wget \
  \) -delete

# Remove init scripts since we do not use them.
RUN rm -fr /etc/init.d /lib/rc /etc/conf.d /etc/inittab /etc/runlevels /etc/rc.conf /etc/logrotate.d

# Remove kernel tunables
RUN rm -fr /etc/sysctl* /etc/modprobe.d /etc/modules /etc/mdev.conf /etc/acpi

# Remove root home dir
RUN rm -fr /root

# Remove fstab
RUN rm -f /etc/fstab

# Remove any symlinks that we broke during previous steps
RUN find /bin /etc /lib /sbin /usr -xdev -type l -exec test ! -e {} \; -delete

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

USER root

RUN find / -type f -iname '*apt*' -xdev -delete
RUN find / -type d -depth -iname '*apt*' -print0 -xdev | xargs -0 rm -r --

RUN sed -i -r "/^($APP_USER)/!d" /etc/group \
  && sed -i -r "/^($APP_USER)/!d" /etc/passwd

USER $APP_USER

WORKDIR ${APP_DIR}
COPY nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
COPY website/build /srv/www
