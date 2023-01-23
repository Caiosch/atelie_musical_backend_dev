FROM php:8.1.1-fpm

# Arguments
ARG user=lira
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    sockets

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
# RUN useradd -G www-data,root -u $uid -d /home/$user $user
# RUN mkdir -p /home/$user/.composer && \
#     chown -R $user:$user /home/$user

# Install redis
# RUN pecl install -o -f redis \
#     &&  rm -rf /tmp/pear \
#     &&  docker-php-ext-enable redis

# UTILS CONFIG
# RUN echo 'date.timezone="America/Sao_Paulo"' >> /usr/local/etc/php/conf.d/date.ini \
#     && echo 'opcache.enable=1' >> /usr/local/etc/php/conf.d/opcache.conf \
#     && echo 'opcache.validate_timestamps=1' >> /usr/local/etc/php/conf.d/opcache.conf \
#     && echo 'opcache.fast_shutdown=1' >> /usr/local/etc/php/conf.d/opcache

# Set working directory
WORKDIR /var/www

COPY . .

# RUN chmod +x /var/www/docker/php/setup.sh
# RUN chmod -R 777 /var/www/storage

# CMD ["chmod", "+x", "/var/www/docker/php/setup.sh"]
# CMD ["chmod", "-R", "777", "/var/www/storage"]
# CMD [ "/var/www/docker/php/setup.sh" ]
