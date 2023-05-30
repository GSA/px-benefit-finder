# BEARS custom module

Docs to be written

## How to Clone the PX-BEARS-DRUPAL Repository with usagov-2021 Submodule
This guide will walk you through the process of cloning the ***PX-BEARS-DRUPAL*** repository that includes a submodule. Submodules are repositories embedded within another repository, allowing you to include external dependencies or shared code as part of your project. When you clone such a project, by default you get the directories that contain submodules, but none of the files within them yet.

To clone the repository with a submodule, follow these steps:

1. Open your command line or terminal.

2. Navigate to the directory where you want to clone the repository. You can use the cd command to change directories. For example, cd Documents/Projects.

3. Use the following command to clone the main repository:

```git clone git@github.com:GSA/px-bears-drupal.git```

4. Once the cloning process completes, navigate into the cloned repository's directory using the cd command.

```cd px-bears-drupal```

5. usagov-2021 directory is there but empty. You must run the following two commands to initialize your local configuration file and fetch all the data from that project.

```git submodule init```

```git submodule update```

6. You have now successfully cloned the repository with a submodule. You can work with the main repository and its submodule as separate entities.

7. If you've already cloned a repository with submodules and want to update them, follow these steps:

    a. Navigate to the main repository's directory using the command line.
    b. Run the following command to update the main repository along with its submodules:
     
```git pull --recurse-submodules```

This command updates the main repository and its submodules to the latest commit.

# Accessibility Statement

We are committed to making our site accessible to all visitors. Our ongoing accessibility effort works towards conforming to Web Content Accessibility Guidelines (WCAG) version 2.1, level AA criteria and by performing regular automatic and manual testing audits.

# Local Development Environment using LANDO

### Get USAgov code
```
git clone git@github.com:usagov/usagov-2021.git poc
cd poc`
```

### Remove /bin files
```
rm -rf bin
```

### Start LANDO
For detailed explanation on how Lando works, check out [Lando docs](https://docs.lando.dev/drupal/getting-started.html).
```
.lando.yml
name: poc
recipe: drupal9
config:
webroot: web
```
```
lando start
lando ssh
```

### Install Drupal modules
For detailed explanation on how Composer works, check out [Composer docs](https://getcomposer.org/doc/00-intro.md).
```
composer install --no-interaction --optimize-autoloader
```

### Install Drupal site
For detailed explanation on how Drush works, check out [Drushdocs](https://www.drush.org/11.x/).
```
drush site:install --db-url=mysql://drupal9:drupal9@database/drupal9 -y
```

### Import USAgov database

Safe development database dumps are kept in Google Drive:
Please contact the DevOps lead to gain access.
Download and Unzip the respective zip file.
Rename uncompressed .sql file to just usagov.sql, and place it into the root of your repo.


```
sed -e 's/utf8mb4_0900_ai_ci/utf8mb4_unicode_ci/g' usagov.sql | drush sqlc
```
This could take over 10 minutes. It will return you to the command prompt when it is done.

Get into USAgov database.
```
mysql -u drupal9 -pdrupal9 --host database drupal9
```

### Get into USAgov local website
```
drush cr
drush uli
http://default/user/reset/1/123456789/ai6u4-iY1LgZFUjwVW2uXjh5jblqgsfUHGFS_U/login

http://poc.lndo.site
```