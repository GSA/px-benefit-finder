#!/bin/bash

kill_pids() {
  app=$1
  ids=$(pgrep -f "${app}" | awk '{print $2}')
  for id in $ids; do
    kill -9 "${id}" &> /dev/null
  done
} &> /dev/null

## Wait for the tunnel to finish connecting.
wait_for_tunnel() {
  count=0
  while : ; do
    [ -n "$(grep 'Press Control-C to stop.' backup.txt)" ] && break
    echo "Waiting for tunnel..."
    [ "${count}" = "60" ] && echo "Connection time out, exiting..." && exit 1
    sleep 1
    count=$((${count} + 1))
  done
}

## Create a tunnel through the application to pull the database.
echo "Creating tunnel to database..."
cf connect-to-service --no-client "${PROJECT}-cms-${BRANCH}" "${PROJECT}-mysql-${BRANCH}" > backup.txt &

wait_for_tunnel

## Create variables and credential file for MySQL login.
echo "Configuring backup '${BRANCH}' database..."
{
  host=$(grep -i host backup.txt | awk '{print $2}')
  port=$(grep -i port backup.txt | awk '{print $2}')
  username=$(grep -i username backup.txt | awk '{print $2}')
  password=$(grep -i password backup.txt | awk '{print $2}')
  dbname=$(grep -i '^name' backup.txt | awk '{print $2}')

  mkdir ~/.mysql && chmod 0700 ~/.mysql

  echo "[mysql]" > ~/.mysql/mysql.cnf
  echo "user=${username}" >> ~/.mysql/mysql.cnf
  echo "password=${password}" >> ~/.mysql/mysql.cnf

  echo "[mysqldump]" > ~/.mysql/mysqldump.cnf
  echo "user=${username}" >> ~/.mysql/mysqldump.cnf
  echo "password=${password}" >> ~/.mysql/mysqldump.cnf
  chmod 400 ~/.mysql/mysqldump.cnf
  
  ## Get cache tables from database.
  mysql \
    --defaults-extra-file=~/.mysql/mysql.cnf \
    --execute="SHOW TABLES;" \
    --host="${host}" \
    --no-auto-rehash \
    --port="${port}" \
    --protocol=TCP \
    "${dbname}" | grep cache_ > exclude.txt

  excluded_tables=$(<exclude.txt)

  additional_tables="sessions"

  declare -a excluded_tables=("${excluded_tables} ${additional_tables}")

  ignored_tables_string=''
  for table in "${excluded_tables[@]}"
  do
    ignored_tables_string+=" --ignore-table=${dbname}.${table}"
  done
} &> /dev/null

echo "Backing up structure for '${BRANCH}' database..."
{
  ## Dump structure
  mysqldump \
    --defaults-extra-file=~/.mysql/mysqldump.cnf \
    --host="${host}" \
    --port="${port}" \
    --protocol=TCP \
    --no-data \
    --skip-extended-insert \
    --quick \
    --max_allowed_packet=512M \
    "${dbname}" > "backup_${BRANCH}.sql"
} &> /dev/null

echo "Backing up data for '${BRANCH}' database..."
{
  ## Dump content
  mysqldump \
    --defaults-extra-file=~/.mysql/mysqldump.cnf \
    --host="${host}" \
    --port="${port}" \
    --protocol=TCP \
    --no-create-info \
    --skip-triggers \
    --skip-extended-insert \
    --quick \
    --max_allowed_packet=512M \
    "${dbname}" >> "backup_${BRANCH}.sql"

  ## Patch out any MySQL 'SET' commands that require admin.
  sed -i 's/^SET /-- &/' "backup_${BRANCH}.sql"

} &> /dev/null

echo "Compressing '${BRANCH}' database..."
{
  mv "backup_${BRANCH}.sql" "${TIMESTAMP}.sql"
  gzip "${TIMESTAMP}.sql"
} &> /dev/null


## Kill the backgrounded SSH tunnel.
echo "Cleaning up old connections..."
{
  kill_pids "connect-to-service"
} &> /dev/null

## Clean up.
rm -rf backup.txt ~/.mysql
