# The site is static except for one PHP endpoint, so it ships as one small container:
# Node builds the bundle, then php:8.3-apache serves the built files and executes
# /api/contact.php. Coolify builds this directly from the repository.

# ---------------------------------------------------------------- build
FROM node:20-alpine AS build

WORKDIR /app

# Dependencies first so a copy change does not invalidate the install layer.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Baked into canonicals, og:url, sitemap.xml, robots.txt and the JSON-LD graph, so a
# staging build must override it or it will advertise production URLs.
ARG SITE_URL=https://bizchemists.com
ENV SITE_URL=$SITE_URL
RUN npm run build

# ---------------------------------------------------------------- runtime
FROM php:8.3-apache AS runtime

# msmtp gives PHP's mail() a real sendmail binary. Without it mail() fails silently
# in a container, because there is no local MTA and nothing to relay through.
RUN apt-get update \
 && apt-get install -y --no-install-recommends msmtp msmtp-mta ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && a2enmod headers expires deflate \
 && a2dismod -f autoindex \
 && printf 'sendmail_path = "/usr/bin/msmtp -t"\n' > /usr/local/etc/php/conf.d/mail.ini \
 && printf 'expose_php = Off\ndisplay_errors = Off\nlog_errors = On\nerror_log = /dev/stderr\n' \
      > /usr/local/etc/php/conf.d/hardening.ini \
 && mv /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini

COPY docker/apache-site.conf /etc/apache2/sites-available/000-default.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY --from=build /app/dist/ /var/www/html/

# Lint the one piece of PHP we ship. A syntax error here would otherwise only surface
# as a broken contact form in production, so fail the build instead.
RUN php -l /var/www/html/api/contact.php \
 && chown -R www-data:www-data /var/www/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD php -r 'exit(@file_get_contents("http://127.0.0.1/robots.txt") === false ? 1 : 0);'

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["apache2-foreground"]
