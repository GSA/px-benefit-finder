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
    [ -n "$(grep 'Press Control-C to stop.' restore.txt)" ] && break
    echo "Waiting for tunnel..."
    sleep 1
  done
}


gunzip database_restore.sql.gz

## Create a tunnel through the application to restore the database.
echo "Creating tunnel to database..."
cf connect-to-service --no-client ${project}-cms-${ENVIRONMENT} ${project}-mysql-${ENVIRONMENT} > restore.txt &

wait_for_tunnel

## Create variables and credential file for MySQL login.
echo "Restoring database to '${ENVIRONMENT}'..."
{
  host=$(cat restore.txt | grep -i host | awk '{print $2}')
  port=$(cat restore.txt | grep -i port | awk '{print $2}')
  username=$(cat restore.txt | grep -i username | awk '{print $2}')
  password=$(cat restore.txt | grep -i password | awk '{print $2}')
  dbname=$(cat restore.txt | grep -i '^name' | awk '{print $2}')

  mkdir ~/.mysql && chmod 0700 ~/.mysql

  echo "[client]" > ~/.mysql/mysql.cnf
  echo "user=${username}" >> ~/.mysql/mysql.cnf
  echo "password=${password}" >> ~/.mysql/mysql.cnf
  chmod 400 ~/.mysql/mysql.cnf
} >/dev/null 2>&1

  ## Drop (delete) current database.
  mysql 
  --defaults-extra-file=~/.mysql/mysql.cnf \
  --host=${host} \
  --port=${port} \
  --protocol=TCP \
  --execute="DROP DATABASE IF EXISTS ${dbname};"
  
  ## Create a new empty database.
  mysql 
  --defaults-extra-file=~/.mysql/mysql.cnf \
  --host=${host} \
  --port=${port} \
  --protocol=TCP \
  --execute="CREATE DATABASE IF NOT EXISTS ${dbname};"

  ## Import data from the backup.
  mysql \
  --defaults-extra-file=~/.mysql/mysql.cnf \
  --host=${host} \
  --port=${port} \
  --protocol=TCP \
  --force \
  --database=${dbname} < database_restore.sql


## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
{
  kill_pids "connect-to-service"
} >/dev/null 2>&1

## Clean up.
rm -rf restore.txt ~/.mysql backup_${ENVIRONMENT}.sql

while read command; do 
  ## Don't send comments, empty lines, or echos.
  if [[ "${command}" != "#"* ]] && [[ -n "${command}" ]] && [[ "${command}" != "echo "*  ]]; then
    bash ./scripts/pipeline/cloud-gov-remote-command.sh "${project}-cms-${ENVIRONMENT}" "${command}" < /dev/null
  fi
done < ./scripts/drush-post-deploy.sh
