#!/bin/bash

composer update
php artisan migrate:fresh --seed --force
php artisan db:seed --force
php artisan storage:link --force
chmod -R 777 ./storage

php-fpm
