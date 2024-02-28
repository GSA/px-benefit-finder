#!/bin/bash

kill_pids() {
  app=$1
  ids=$(ps aux | grep ${app} | grep -v grep | awk '{print $2}')
  for id in ${ids}; do
    kill -9 ${id} >> kill.txt
  done
} >/dev/null 2>&1

## Wait for the tunnel to finish connecting.
wait_for_tunnel() {
  while : ; do
    [ -n "$(grep 'Press Control-C to stop.' backup.txt)" ] && break
    echo "Waiting for tunnel..."
    sleep 1
  done
}

## Create a tunnel through the application to pull the database.
echo "Creating tunnel to database..."
cf connect-to-service --no-client ${project}-cms-${ENVIRONMENT} ${project}-mysql-${ENVIRONMENT} > backup.txt &

wait_for_tunnel

## Create variables and credential file for MySQL login.
echo "Configuring backup '${ENVIRONMENT}' database..."
{
  host=$(cat backup.txt | grep -i host | awk '{print $2}')
  port=$(cat backup.txt | grep -i port | awk '{print $2}')
  username=$(cat backup.txt | grep -i username | awk '{print $2}')
  password=$(cat backup.txt | grep -i password | awk '{print $2}')
  dbname=$(cat backup.txt | grep -i '^name' | awk '{print $2}')

  mkdir ~/.mysql && chmod 0700 ~/.mysql

  echo "[mysqldump]" > ~/.mysql/mysqldump.cnf
  echo "user=${username}" >> ~/.mysql/mysqldump.cnf
  echo "password=${password}" >> ~/.mysql/mysqldump.cnf
  chmod 400 ~/.mysql/mysqldump.cnf

  ## Exclude tables without data
  declare -a excluded_tables=(
    "cache_advagg_minify"
    "cache_bootstrap"
    "cache_config"
    "cache_container"
    "cache_data"
    "cache_default"
    "cache_discovery"
    "cache_discovery_migration"
    "cache_dynamic_page_cache"
    "cache_entity"
    "cache_menu"
    "cache_migrate"
    "cache_page"
    "cache_render"
    "cache_rest"
    "cache_toolbar"
    "sessions"
    "watchdog"
    "webprofiler"
  )

  ignored_tables_string=''
  for table in "${excluded_tables[@]}"
  do
    ignored_tables_string+=" --ignore-table=${dbname}.${table}"
  done
} >/dev/null 2>&1
  
echo "Backing up structure for '${ENVIRONMENT}' database..."
{
  ## Dump structure
  mysqldump \
    --defaults-extra-file=~/.mysql/mysqldump.cnf \
    --host=${host} \
    --port=${port} \
    --protocol=TCP \
    --no-data \
    ${dbname} > backup_${ENVIRONMENT}.sql
} >/dev/null 2>&1

echo "Backing up data for '${ENVIRONMENT}' database..."
{
  ## Dump content
  mysqldump \
    --defaults-extra-file=~/.mysql/mysqldump.cnf \
    --host=${host} \
    --port=${port} \
    --protocol=TCP \
    --no-create-info \
    --skip-triggers \
    ${ignored_tables_string} \
    ${dbname} >> backup_${ENVIRONMENT}.sql

  ## Patch out any MySQL 'SET' commands that require admin.
  sed -i 's/^SET /-- &/' backup_${ENVIRONMENT}.sql

} >/dev/null 2>&1

echo "Compressing '${ENVIRONMENT}' database..."
{
  mv backup_${ENVIRONMENT}.sql ${TIMESTAMP}.sql
  gzip ${TIMESTAMP}.sql
} >/dev/null 2>&1


## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
{
  kill_pids "connect-to-service"
} >/dev/null 2>&1

## Clean up.
rm -rf backup.txt ~/.mysql
