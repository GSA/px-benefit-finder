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

# Local Development Environment

### Install Package Manager

We use lerna as our monorepo package manager

```
npm install --global lerna
```

### Get USAgov code
```
git clone git@github.com:usagov/usagov-2021.git poc
cd poc`
```

### Get USAgov code

Set up local development site following README.md.
