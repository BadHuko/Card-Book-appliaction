FROM php:7.4-fpm

# Install dependencies
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mysqli

# Copy the PHP code to the working directory
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html
