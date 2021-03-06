#!/bin/bash

IFS=$'\n\t'

set -e

NAME=`cat laravel/composer.json | python -c "import json,sys;obj=json.load(sys.stdin);print(obj['name'])"`

DEV_IMAGE=dev
# Executables
DC=docker-compose
DM=docker-machine
D=docker

## Exported docker name
D_NS=library-system
D_IMAGE_NAME=${NAME}
D_PROD_IMAGE=${D_NS}/${D_IMAGE_NAME}

## version
BUILD_TAG=${BUILD_TAG:-localdev}
PACKAGE_VERSION=`cat laravel/composer.json | python2.7 -c "import json,sys;obj=json.load(sys.stdin);print(obj['version'])"`
VERSION="${PACKAGE_VERSION}.${BUILD_TAG}"

R="\x1B[1;31m"
G="\x1B[1;32m"
W="\x1B[0m"

function info {
  echo -e "${G}${1}${W}"
}

function error {
  echo -e "${R}${1}${W}"
}

function helptext {
  info "Usage: ./go <command>"
  echo ""
  info "Available commands are:"
  echo "    build              Setup the project on your development machine."
  echo "    start             Start the server and it's dependencies."
  echo "    stop              Shut down the server and it's dependencies."
  echo "    nuke              Remove all local resources related to this project."
  echo "    seed              Seed database with data"
  echo "    test              Run laravel tests"
}

function test {
  ${DC} run --rm app php artisan test
}

function db {
  ${DC} exec app php artisan tinker
}

function build {
  ${DC} build
}

function setup-app {
  info "configuring laravel app"
  ${DC} exec app php artisan key:generate
  ${DC} exec app php artisan config:cache
}

function seed {
  info "DB seeding"
  ${DC} exec app php artisan db:seed
}

function start {
  ${DC} up
}

function stop {
  ${DC} stop
  ${DC} down
}

function nuke {
  read -p "š„š£š„ Are you sure you want to nuke all running containers and remove transpiled code and the node_modules?š„š£š„ (y/n) " -n 1 -r
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    info "\nš„š„š„ Stopping all running containers š„š„š„"
    ${DC} down
    info "\nš„š„š„ Removing all associated images š„š„š„"
    # TODO: Update to delete images/containers from Docker-compose
    [[ -n $(${D} images -q ${D_PROD_IMAGE}) ]] && ${D} rmi -f $(${D} images -q ${D_PROD_IMAGE})
    info "\nš„š„š„ Nuking ALL YOUR build cache š„š„š„"
    rm -rf laravel/node_modules laravel/vendor laravel/.env laravel/public/css laravel/public/fonts laravel/public/images laravel/public/js
  fi
}


[[ $@ ]] || { helptext; exit 1; }

case "$1" in
    help) helptext
    ;;
    build) build
    ;;
    start) start
    ;;
    stop) stop
    ;;
    env) env
    ;;
    nuke) nuke
    ;;
    test) test
    ;;
    db) db
    ;;
    seed) seed
    ;;
    setup-app) setup-app
    ;;
    *)
    error "Unrecognized command! Please see usage below\n"
    helptext
    exit 1
esac