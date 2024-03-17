# USAgov Benefit Finder module

* USAgov bears app folder
  * USAgov bears block module
* USAgov bears content module
* USAgov bears API module

```
bin/drush pm:enable usagov_bears_block
bin/drush pm:enable usagov_bears_content
bin/drush pm:enable usagov_bears_api
bin/drush pm:enable usagov_bears
```

These enable the USAgov bears modules.

## USAgov bears block module

This module provides custom block "usagov bears block" with div id="usagov-bears-app" for React app.

## USAgov bears content module

config/optional folder include configuration of content type, taxonomy, paragraph...

```
bin/drush config:import \
  --partial \
  --source=modules/custom/usagov_bears/modules/usagov_bears_content/config/optional
```
This imports the configuration of content type, taxonomy, paragraph, custom entity.


config folder includes content type, taxonomy, paragraph, custom entity configuration.

```
bin/drush config:import \
  --partial \
  --source=modules/custom/usagov_bears/modules/usagov_bears_content/config
```
This imports the configuration of content type, taxonomy, paragraph, custom entity.

path: /bears/import-life-event

This imports Life Event content.

## USAgov bears API module

path: /bears/api/life-event/{name}

This outputs JSON data of given life event.

For example,

/bears/api/life-event/death of a loved one

/bears/api/life-event/retirement

/bears/api/life-event/disability

## Local Functional Testing

#### Set up local development site

Make sure that local development site setup and run at http://localhost

The functional testing uses the existing database of local development site.

#### Change to local development site directory

```
cd usagov-2021
```

#### Install Testing Software

```
bin/composer require --dev drupal/core-dev
bin/composer require --dev phpunit/phpunit
bin/composer require --dev behat/mink
bin/composer require --dev behat/mink-browserkit-driver
bin/composer require --dev behat/mink-selenium2-driver
bin/composer require --dev weitzman/drupal-test-traits
bin/composer dump-autoload
```

#### Uninstall USAGov Login Customizations module

```
bin/drush pm:uninstall usagov_login
```

#### Copy phpunit.xml to local development site

```
cp tests/phpunit.xml usagov-2021/phpunit.xml
```

#### The system is ready for functional testing

#### The following is a functional testing example.

Start SSH session
```
bin/ssh
cd /var/www
```

Use following command to test Benefit Finder API
```
/var/www # ./vendor/bin/phpunit \
web/modules/custom/usagov_benefit_finder/tests/src/Functional/BenefitFinderTest.php \
--group usagov_benefit_finder \
--filter testApi
```

Use following command if you want HTML output
```
/var/www # BROWSERTEST_OUTPUT_DIRECTORY=/tmp \
./vendor/bin/phpunit \
web/modules/custom/usagov_benefit_finder/tests/src/Functional/BenefitFinderTest.php \
--group usagov_benefit_finder \
--filter testApi \
--printer="\Drupal\Tests\Listeners\HtmlOutputPrinter"
```

The test displays result.
```
PHPUnit 9.6.17 by Sebastian Bergmann and contributors.

.                                                                   1 / 1 (100%)

Time: 00:02.558, Memory: 30.00 MB

OK (1 test, 7 assertions)

HTML output was generated
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-1-dtt.html
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-2-dtt.html
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-3-dtt.html
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-4-dtt.html
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-5-dtt.html
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-6-dtt.html
http://localhost/sites/simpletest/browser_output/Drupal_Tests_usagov_benefit_finder_Functional_BenefitFinderTest-7-dtt.html

```
