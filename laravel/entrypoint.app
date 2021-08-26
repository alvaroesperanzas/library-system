#!/bin/bash

set -e

cd /var/www

touch .env
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate:refresh --seed
php artisan config:cache

exec "$@"