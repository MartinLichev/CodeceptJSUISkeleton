# codeceptJS-javascript-e2e-poc

## Proof of Concept Automation Project Guide
The purpose of this guide is to present a detailed walkthough to the end user, of the codeceptJS-javascript-e2e-poc Project.

## Content:
|Sections:                                                       |
|----------------------------------------------------------------|
|[1.Overview](#overview)                                           |
|[2.System Foundation Requirements](#system-foundation-minimum-requirements)
|[3.About CodeceptJS Testing Framework](#about-codeceptjs-testing-framework)
|[3.1 Locators](#locators)
|[3.1.1 CSS And Xpath Locators](#css-and-xpath)
|[3.1.2 Semantic Locators](#semantic-locators)
|[3.1.3 Locator Builder](#locator-builder)
|[3.1.4 ID Locators](#id-locators)
|[3.1.5 Custom Locators](#custom-locators)
|[3.1.5.1 Custom Strategy Locators](#custom-strategy-locators)
|[3.1.5.2 Custom String Locators](#custom-string-locators)
|[3.2 Assertions](#assertions)
|[4.Getting Started](#getting-started)
|[ 4.1 Configuring Java Runtime Environment](#1-configuring-java-runtime-environment)
|[ 4.2 Setting up Java inside System Environmental Variables](#2-setting-up-java-inside-system-environmental-variables)
|[ 4.3 Installing NodeJS Open Source Server Environment](#3-installing-nodejs-open-source-server-environment)
|[ 4.4 Installing and configuring CodeceptJS Testing Framework](#4-installing-and-configuring-codeceptjs-testing-framework)
|[ 4.5 Installing and configuring Git Version Control on local level](#5-installing-and-configuring-git-version-control-on-local-level)
|[ 4.6 Installing and configuring Allure Reporting Tool locally](#6-installing-and-configuring-allure-reporting-tool-locally)
|[ 4.7 Cloning eReq E2E Project on ones local end](#7-cloning-ereq-e2e-project-on-a-local-end)
|[5.About Project Structure](#8-about-e2e-project-structure)
|[6.Running E2E Project locally](#9-running-e2e-project-locally)
## <a name="overview"></a> Overview
|                                                                                                         |
|------------------------------------------------------------------------------------                             |
|Powerfull E2E Project written in [**JavaScript**](https://www.javascript.com/) programming Language.             |
|Utilizes [**Page Object Model**](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/) Design Pattern.                                    |
|Wrapped around [**CodeceptJS**](https://codecept.io/) Testing Framework and [**Playwright**](https://playwrigh.dev/) as a Helper. |
|Set on [**nodeJS**](https://nodejs.org/en/about/) technology as a building block doundation.                      |
|Using [**databaseJS**](https://github.com/mlaanderson/database-js) wrapper to connect to existing [**SQL Database**](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) and do all sorts of query manipulations.
|Uses [**Allure Framework**](https://docs.qameta.io/allure/#:~:text=Allure%20Framework%20is%20a%20flexible,from%20everyday%20execution%20of%20tests.) Test Reporting Tool to generate graphical report of E2E specs current run.

## <a name="system reqs"></a> System Foundation Minimum Requirements
In order for local run and execution of eReq E2E Project, following criteria should be met!

|Requirement                              |   Criteria         |
|-----------------------------------------|--------------------|
|Java Runtime Environment                 |```version>=1.8.0_152```|
|NodeJS                                   |```version>=16.3.0```   |
|Operating System                         | Linux/Windows/Mac      |
|CodeceptJS Testing Framework             |```version>=3.3.6```    |
|Playwright Helper Wrapper                |```version>=3.3.6```    |
|Git Version Control                      |```version>=2.38.1```   |

## About CodeceptJS Testing Framework
CodeceptJS is a modern end to end testing framework with a special BDD-style syntax. The tests are written as a linear scenario of the user's action on a site.
<p>Tests are expected to be written in ECMAScript 7.</p>
<p>Each test is described inside a Scenario function with the I object passed into it. The I object is an actor, an abstraction for a testing user. The I is a proxy object for currently enabled Helpers.</p>

```javascript
Feature('CodeceptJS demo');

Scenario('check Welcome page on site', ({ I }) => {
  I.amOnPage('/');
  I.see('Welcome');
});

```
<p>Real World Example:</p>

```javascript
const faker = require('@faker-js/faker');                               // Use 3rd-party JS code

Feature('Store');

Scenario('Create a new store', async ({ I, login, SettingsPage }) => {
  const storeName = faker.lorem.slug();
  login('customer');                                          // Login customer from saved cookies
  SettingsPage.open();                                        // Use Page objects
  I.dontSee(storeName, '.settings');                          // Assert text not present inside an element (located by CSS)
  I.click('Add', '.settings');                                // Click link by text inside element (located by CSS)
  I.fillField('Store Name', storeName);                       // Fill fields by labels or placeholders
  I.fillField('Email', faker.internet.email());
  I.fillField('Telephone', faker.phone.phoneNumberFormat());
  I.selectInDropdown('Status', 'Active');                     // Use custom methods
  I.retry(2).click('Create');                                 // Retry flaky step
  I.waitInUrl('/settings/setup/stores');                      // Explicit waiter
  I.see(storeName, '.settings');                              // Assert text present inside an element (located by CSS)
  const storeId = await I.grabTextFrom('#store-id');          // Use await to get information from browser
  I.say(`Created a store with ${storeId}`);                   // Print custom comments
}).tag('stores');`;

```
<p>CodeceptJS bypasses execution commands to helpers. Depending on the helper enabled, your tests will be executed differently. If you need cross-browser support you should choose Selenium-based WebDriver or TestCafé. If you are interested in speed - you should use Chrome-based Puppeteer.</p>

![CodeceptJS Architecture Diagram](codeceptjs-javascript-e2e-poc\images\architecture.png)

## Locators:

CodeceptJS provides flexible strategies for locating elements:

### CSS and XPath locators
- Semantic locators: by link text, by button text, by field names, etc.
- Locator Builder
- ID locators: by CSS id or by accessibility id
- Custom Locator Strategies: by data attributes or whatever you prefer.
- Shadow DOM: to access shadow dom elements
- React: to access React elements by component names and props
- Most methods in CodeceptJS use locators which can be either a string or an object.

NB!If the locator is an object, it should have a single element, with the key signifying the locator type (```id, name, css, xpath, link, react, class``` or ```shadow```) and the value being the locator itself. This is called a "strict" locator.

Examples:

```{id: 'foo'}``` matches ```<div id="foo">```

```{name: 'foo'}``` matches ```<div name="foo">```

```{css: 'input[type=input][value=foo]'}``` matches ```<input type="input" value="foo">```

```{xpath: "//input[@type='submit'][contains(@value, 'foo')]"}``` matches ```<input type="submit" value="foobar">```

```{class: 'foo'}``` matches ```<div class="foo">```

Writing good locators can be tricky. The Mozilla team has written an excellent guide titled Writing reliable locators for Selenium and WebDriver tests inside this [link](https://blog.mozilla.org/fxtesteng/2013/09/26/writing-reliable-locators-for-selenium-and-webdriver-tests/).

If you prefer, you may also pass a string for the locator. This is called a "fuzzy" locator. In this case, CodeceptJS uses a variety of heuristics (depending on the exact method called) to determine what element you're referring to. If you are locating a clickable element or an input element, CodeceptJS will use semantic locators.

For example, here's the heuristic used for the fillField method:

- Does the locator look like an ID selector (e.g. "#foo")? If so, try to find an input element matching that ID.
- If nothing found, check if locator looks like a CSS selector. If so, run it.
- If nothing found, check if locator looks like an XPath expression. If so, run it.
- If nothing found, check if there is an input element with a corresponding name.
- If nothing found, check if there is a label with specified text for input element.
- If nothing found, throw an ElementNotFound exception.

**NB! Be warned that fuzzy locators can be significantly slower than strict locators. If speed is a concern, it's recommended you stick with explicitly specifying the locator type via object syntax.**

It is recommended to avoid using implicit CSS locators in methods like fillField or click, where semantic locators are allowed. Use locator type to speed up search by various locator strategies.

```javascript
// will search for "input[type=password]" text before trying to search by CSS
I.fillField('input[type=password]', '123456');
// replace with strict locator
I.fillField({ css: 'input[type=password]' }, '123456');
```

## CSS and XPath
Both CSS and XPath is supported. Usually CodeceptJS can guess locator's type:

```javascript
// select by CSS
I.seeElement('.user .profile');
I.seeElement('#user-name');

// select by XPath
I.seeElement('//table/tr/td[position()=3]');
// To specify exact locator type use strict locators:

// it's not clear that 'button' is actual CSS locator
I.seeElement({ css: 'button' });

// it's not clear that 'descendant::table/tr' is actual XPath locator
I.seeElement({ xpath: 'descendant::table/tr' });
```

## Semantic Locators
CodeceptJS can guess an element's locator from context. For example, when clicking CodeceptJS will try to find a link or button by their text When typing into a field this field can be located by its name, placeholder.

```javascript

I.click('Sign In');
I.fillField('Username', 'davert');
```

Various strategies are used to locate semantic elements. However, they may run slower than specifying locator by XPath or CSS.

## Locator Builder
CodeceptJS provides a fluent builder to compose custom locators in JavaScript. Use locate function to start.

To locate a element inside label with text: 'Hello' use:

```javascript

locate('a')
  .withAttr({ href: '#' })
  .inside(locate('label').withText('Hello'));
```
which will produce following XPath:

```

.//a[@href = '#'][ancestor::label[contains(., 'Hello')]]
```
Locator builder accepts both XPath and CSS as parameters but converts them to XPath as more feature-rich format. Sometimes provided locators can get very long so it's recommended to simplify the output by providing a brief description for generated XPath:

```javascript

locate('//table')
  .find('a')
  .withText('Edit')
  .as('edit button')
// will be printed as 'edit button'
```

locate has following methods:

```javascript
.find();
```

Finds an element inside a located.
```javascript
// find td inside a table
locate('table').find('td');
```

Switches current element to found one. Can accept another locate call or strict locator.

```javascript
.withAttr();
```

Find an element with provided attributes

```javascript
// find input with placeholder 'Type in name'
locate('input').withAttr({ placeholder: 'Type in name' });
```

```javascript
.withChild();
```

Finds an element which contains a child element provided:

```javascript

// finds form with <select> inside it
locate('form').withChild('select');
```

```javascript
.withDescendant();
```

Finds an element which contains a descendant element provided:

```javascript
// finds form with <select> which is the descendant it
locate('form').withDescendant('select');
```

```javascript
.withText();
```

Finds element containing a text

```javascript
locate('span').withText('Warning');
```

```javascript
.first();
```

Get first element:

```javascript
locate('#table td').first();
```

```javascript
.last();
```

Get last element:

```javascript
locate('#table td').last();
```

```javascript
.at();
```

Get element at position:
```javascript
// first element
locate('#table td').at(1);
// second element
locate('#table td').at(2);
// second element from end
locate('#table td').at(-2);
```
## ID Locators
ID locators are best to select the exact semantic element in web and mobile testing:

```user``` or ```{ id: 'user' }``` finds element with ```id="user"```

```user``` finds element with accessibility id "user" (in Mobile testing) or with ```aria-label=user```

## Custom Locators
CodeceptJS allows to create custom locator strategies and use them in tests. This way you can define your own handling of elements using specially prepared attributes of elements.

What if you use special test attributes for locators such as data-qa, data-test, test-id, etc. We created customLocator plugin to declare rules for locating element.

Instead of writing a full CSS locator like ```[data-qa-id=user_name]``` simplify it to $user_name.

```javascript
// replace this:
I.click({ css: '[data-test-id=register_button]'});
// with this:
I.click('$register_button');
```
### Custom String Locators
What if we want to locators prefixed with = to match elements with exact text value. We can do that too:

```javascript

// inside a plugin or a bootstrap script:
codeceptjs.locator.addFilter((providedLocator, locatorObj) => {
    if (typeof providedLocator === 'string') {
      // this is a string
      if (providedLocator[0] === '=') {
        locatorObj.value = `.//*[text()="${providedLocator.substring(1)}"]`;
        locatorObj.type = 'xpath';
      }
    }
});
```

New locator strategy is ready to use:
```javascript
I.click('=Login');
```

### Custom Strategy Locators
CodeceptJS provides the option to specify custom locators that uses Custom Locator Strategies defined in the WebDriver configuration. It uses the WebDriverIO's custom$ locators internally to locate the elements on page. To use the defined Custom Locator Strategy add your custom strategy to your configuration.

```javascript
// in codecept.conf.js

const myStrat = (selector) => {
  return document.querySelectorAll(selector)
}

// under WebDriver Helpers Configuration
WebDriver: {
  ...
  customLocatorStrategies: {
    custom: myStrat
  }
}
I.click({custom: 'my-shadow-element-unique-css'})
```

## Assertions

In order to verify the expected behavior of a web application, web page connects should be checked. CodeceptJS provides built-in assertions for that. They start with ```see``` (or ```dontSee```) prefix, as they describe user's current vision.

The most general and common assertion is see:

```javascript
// Just a visible text on a page
I.see('Hello');
// text inside .msg element
I.see('Hello', '.msg');
// opposite
I.dontSee('Bye');

```

You should provide a text as first argument, and optionally a locator to narrow the search context.

You can check that specific element exists (or not) on a page, as it was described in Locating Element section.

```javascript
I.seeElement('.notice');
I.dontSeeElement('.error');
Additional assertions:

I.seeInCurrentUrl('/user/miles');
I.seeInField('user[name]', 'Miles');
I.seeInTitle('My Website');

```

## Getting Started
## 1. Configuring Java Runtime Environment
<p> As first Step, we would need to make sure that Java Virtual Machine is installed and configured locally.</p>
<p> Run the following command from the terminal:</p>

``` 
java -version 
```
<p> If Java is locally installed, something simmilar should be present!</p>

```
java version "1.8.0_152"
Java(TM) SE Runtime Environment (build 1.8.0_152-b31)
Java HotSpot(TM) Client VM (build 25.152-b31, mixed mode)
```
In case the command is not recognized, Java Runtime Environment should be installed from [**here**](https://www.java.com/download/ie_manual.jsp).

## 2. Setting up Java inside System Environmental Variables.
<p> In order to take full advantage of Java Virtual Machine, the path to the local Variables inside the System Setting should be set</p>

<p><strong>1.</strong> Right-click the <strong>Computer</strong> icon on your desktop and select <strong>Properties</strong>.</p>
<p><strong>2.</strong> Click <strong>Advanced system settings</strong>.</p>
<p><strong>3.</strong> Click <strong>Environment</strong> variables.</p>
<p><strong>4.</strong> Under <strong>User variables</strong>, click **New**.</p>
<p><strong>5.</strong> Enter <strong>JAVA_HOME</strong> as the variable name.</p>
<p><strong>6.</strong> Enter the path to the <strong>JDK</strong> as the variable value. For example, <strong>C:\Program Files (x86)\IBM\Java70\</strong></p>
<p><strong>7.</strong> Click <strong>OK</strong>.</p>
<p><strong>8.</strong> Locate the <strong>PATH</strong> variable.</p>
<p><strong>9.</strong> Append the path to the <strong>JDK</strong> (up to the bin folder) as the PATH value. For example, <strong>C:\Program Files (x86)\IBM\Java70\bin.<strong></p>

## 3. Installing NodeJS Open Source Server Environment.

<p> In order to set the foundations of CodeceptJS Testing Framework, we would require to have NodeJS installed.</p>  

<p>1. Download Latest NodeJS version from <a href="https://nodejs.org/en/">here</a>!</p>
<p>2. Once NodeJS is installed, run the following command inside terminal:</p>

```
node -v
```

<p> Output should be like: </p>

```
v18.2.0
```

<p>3. All together with NodeJS, Node Package Manager (npm), should also be installed.</p>
<p>Confirm this by running the following command:</p>

```
npm -v
```

<p>Output should be like: </p>

```
8.9.0
```

## 4. Installing and configuring CodeceptJS Testing Framework.

<p>1. Install CodeceptJS, by running the following command from terminal</p>

```
npx codeceptjs init
```
Alternatively, since we have Node Package Manager already configured, alongise NodeJS, we can use the following command as well!

```
npm i codeceptjs
```
<p>Sample output in terminal can be the following:</p>

```
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated gherkin@5.1.0: This package is now published under @cucumber/gherkin
npm WARN deprecated cucumber-expressions@6.6.2: This package is now published under @cucumber/cucumber-expressions
npm WARN deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.

added 556 packages, and audited 557 packages in 23s

86 packages are looking for funding
  run `npm fund` for details
```
<p>2. When asked the following question, choose Playwright as an option!</p>

```
? What helpers do you want to use?
❯◉ Playwright
 ◯ WebDriver
 ◯ Puppeteer
 ◯ Puppeteer
 ◯ Appium
 ◯ Nightmare
 ◯ FileSystem
```

<p><strong> Following command offers a Quickstart option, with installing All In One (CodeceptJS + Playwright Helper) </strong></p>

```
npx create-codeceptjs
```

It is recomended for a more quicker, non-custom made installation of the Framework.

<p>NB! For other details regarding NodeJS extended Libraries and Dependancies, following <a href="https://www.npmjs.com/">link</a> can be used.</p>

<p>3. Wait for CodeceptJS and all of its Components to be installed.</p>
Once done, the entire Framework will be up and running on your local end!

![CodeceptJS Installation Proccess](images\codeceptinstall.gif)

## 5. Installing and configuring Git Version Control on local level.
<p>In order for us to clone the eReq E2E app on a local level and start commiting to the project, we
would need to have Git - Distributed Version Control configured locally. Git can be downloaded and installed from <a href="https://git-scm.com/downloads">here</a>!</p> 

Run ``` git --version ``` to check if it is successfully configured!

Output should be like:

```
git version 2.36.1.windows.1
```

## 6. Installing and configuring Allure Reporting Tool locally.
For our Project to take full advantage of Allure Reporting Tool, we would need to install the ``` allure ``` plugin locally.

Open windows ``` powershell ``` and run the following command:

```
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
> irm get.scoop.sh | iex
```

<p>NB! In order to execute and run above-mentioned commands, elevation of Administration Rights might be required.</p>

After that, open terminal window and execute:

```
scoop install allure
```

<p>NB! In case, Allure is already configured on the current machine, following Output will be present!</p>

```
Updating Scoop...
Updating 'main' bucket...
 Converting 'main' bucket to git repo...
Checking repo... OK
The main bucket was added successfully.
Scoop was updated successfully!
WARN  'allure' (2.19.0) is already installed.
Use 'scoop update allure' to install a new version.
```

<p>If this is the case, run the following command:</p>

```
scoop update allure
```

And successfull Output should be:

```
allure: 2.19.0 -> 2.20.1
Updating one outdated app:
Updating 'allure' (2.19.0 -> 2.20.1)
Downloading new version
allure-2.20.1.zip (20.3 MB) [=====================================================================================================================================================] 100%
Checking hash of allure-2.20.1.zip ... ok.
Uninstalling 'allure' (2.19.0)
Removing shim 'allure'.
Removing shim 'allure.cmd'.
Unlinking ~\scoop\apps\allure\current
Installing 'allure' (2.20.1) [64bit] from main bucket
Loading allure-2.20.1.zip from cache
Extracting allure-2.20.1.zip ... done.
Linking ~\scoop\apps\allure\current => ~\scoop\apps\allure\2.20.1
Creating shim for 'allure'.
'allure' (2.20.1) was installed successfully!
```
Once, done typing ``` allure ``` in cmd, output should be like:

```
Usage: allure [options] [command] [command options]
  Options:
    --help
      Print commandline help.
    -q, --quiet
      Switch on the quiet mode.
      Default: false
    -v, --verbose
      Switch on the verbose mode.
      Default: false
    --version
      Print commandline version.
      Default: false

```

NB! After finishing currenrt run, appending ``` :allure ``` flag in CLI command, E2E Project automatically generates detailed HTML report in new browser client tab.

<p>Sample HTML report page.</p>

![Allure Report Page](images\passedAllure.PNG)

We can also, expand and view details regarding each Test Spec.

![Allure Details](images\passedTestDetails.PNG)

<p>In case we have a failed Test Spec, inside Allure Report we can see the exact spec that has failed, including screenshot and Error Message.</p>

![Failed Details](images\failedscreen.PNG)

## 7. Cloning eReq E2E Project on a local end.
<p>Once Git is configured and all other above-mentioned pre-requirements are met, E2E Project can be cloned on a local level</p>

Execute the following commands from the local terminal, to configure Git local User.
### Git global setup (Configuring Git User locally)
```
git config --global user.name "Your Name"
git config --global user.email "your.name@youremail.com"
```

### Create a new repository (Creating Local Project Folder and cloning the existing Git Repo)
<p>Create a local folder inside computer root directory, where cloned Repo from Git will be stored</p>
<p>Once ready execute the following commands in terminal</p>

```
cd project/root/directory/local-level
git clone https://gitlab.programista.pro/qa/codeceptjs-javascript-e2e-poc
git switch -c main
git pull origin main
```
<p>E2E CodeceptJS Automation Project poc is now cloned on a local level and we can start commiting changes to it.</p>
***NB! Depending on your Role and Permission given, you might be prompted to input your PrimeHolding SSO Credentials***

<p>In case you haven't been granted PrimeHolding Credentials, turn to someone from Sys Admin Team to be provisioned such!</p>

## 8. About E2E Project Structure
<p>As mentioned earlier the Project follows the famous <strong>Page Object Model</strong> Design Pattern.</p>

Inside ```pom >> auth``` and ```pom >> campaign``` are located all the **Page Object** Classes!

![Page Objects](images\pom.PNG)

Inside ```tests >> auth``` and ```tests >> campaign``` are located all the executable test specs.

![Test Suites](images\tests.PNG)

``` data ``` directory stores separate files, which store data that's being used by the current automation run.

![Data](images\data.PNG)

<p>NB! In order to view and read/write Excel supported files from the IDE, we would require to install the following extension from Marketplace.</p>

![MarketPlace](images\excelmarket.PNG)

Under ``` lib ``` subdirectory, all the Helper Classes with ``` general_helper methods ``` are stored, which among the ``` codeceptjs.conf.js ``` file set the foundation of the Project.

![Helpers](images\helpers.PNG)

<p>e.g</p>

``` javascript

    /**
     * @param {String} locator
     */
    async clickOnBody(locator) {
        await I.wait(3);

        I.waitForElement(locator, config.waitPeriod.large);
        I.click(locator);
    },

```
``` javascript
    /**
     * @param {Array} data
     */
    clearDBLocalStorage(data) {
        while(data.length > 0){
            data.pop();
        }
    }

```
The ``` .gitignore ``` file, outlines all policies for files, folders or subfolders which are ignored and not push to Repo with latest commit.

<p>e.g</p>

``` javascript
output
allure-results
node_modules
package-lock.json
```

Under ``` node_modules ``` subfolder, all important external libraries and dependencies are being stored.

![Node Modules](images\nodemodules.PNG)

The ``` allure-results ``` folder, contains the latest Allure Report result from last E2E Project run.

![Allure Results](images\allureresults.PNG)

## 9. Running E2E Project locally.
To execute the Project on your local machine, open terminal window and navigate to Project Directory, where ``` codeceptjs.conf.js ``` file is located.

Your console should look like:

```
 Directory of C:\Users\MartinLichev\Visual Studio Code Projects\e2e-cdjs-project\codeceptjs-javascript-e2e-poc

11/21/2022  08:23 PM    <DIR>          .
11/21/2022  08:23 PM    <DIR>          ..
11/21/2022  07:46 PM                55 .gitignore
11/21/2022  07:46 PM             2,423 codecept.conf.js
11/21/2022  07:46 PM                54 jsconfig.json
11/21/2022  07:46 PM    <DIR>          lib
11/21/2022  07:46 PM             1,138 package.json
11/21/2022  07:46 PM    <DIR>          pom
11/22/2022  02:54 PM            18,275 README.md
11/21/2022  07:46 PM               328 steps.d.ts
11/21/2022  07:46 PM             1,452 steps_file.js
11/21/2022  07:46 PM    <DIR>          tests
               7 File(s)         23,725 bytes
               5 Dir(s)  370,665,705,472 bytes free

```

Execute the following command: 

```
npm run
```
List of all Project related CLI command should appear:
<p>(e.g)</p>

```
Scripts available in codeceptjs-tests@0.1.0 via `npm run-script`:
  codeceptjs
    codeceptjs run --steps --debug --plugins allure
  codeceptjs:headless
    HEADLESS=true codeceptjs run --steps
  codeceptjs:ui
    codecept-ui --app
  codeceptjs:demo
    codeceptjs run --steps -c node_modules/@codeceptjs/examples
  codeceptjs:demo:headless
    HEADLESS=true codeceptjs run --steps -c node_modules/@codeceptjs/examples
  codeceptjs:demo:ui
    codecept-ui --app  -c node_modules/@codeceptjs/examples
  codeceptjs:parallel
    codeceptjs run-multiple --all --steps
  codeceptjs:allure
    codeceptjs run --steps --debug --plugins allure
  codeceptjs:allure:parallel
    codeceptjs run-multiple --all --steps --plugins allure
```
Different commands, run the specs in a different way.
Most commonly used is ```npm run codeceptjs:allure:parallel```.
It executes entire E2E Project, with each spec being ran in parallel to the other one.
Putting a keyword( ``` --flag ``` ) right after ```npm run ereqapp:allure:parallel``` indicates some special capabilities.

For example, putting ``` --flag  qa/dev/uat/stg ``` could indicate the Environment our Test Suite will run onto.

<p>(e.g)</p>

```
npm run codeceptjs:allure:parallel
```

Sample output inside the console:

```
> codeceptjs-tests@0.1.0 codeceptjs:allure:parallel
> codeceptjs run-multiple --all --steps --plugins allure

creating output directory: C:\Users\MartinLichev\Visual Studio Code Projects\e2e-cdjs-project\codeceptjs-javascript-e2e-poc\output\parallel_chunk1_c517c9cff4c7f5bdd4c84ba47812620e_1
[1.parallel:chunk1:firefox] CodeceptJS v3.0.7
[1.parallel:chunk1:firefox] Using test root "C:\Users\MartinLichev\Visual Studio Code Projects\e2e-cdjs-project\codeceptjs-javascript-e2e-poc"

[1.parallel:chunk1:firefox] FEATURE #01 --
[1.parallel:chunk1:firefox]   #1 Successfully add product to cart
[1.parallel:chunk1:firefox]     I wait 5
[1.parallel:chunk1:firefox]     I: login {"username":"standard_user","password":"secret_sauce"}
[1.parallel:chunk1:firefox]       I am on page "https://www.saucedemo.com/"
[1.parallel:chunk1:firefox]       I wait 3
[1.parallel:chunk1:firefox]       I wait for element ".login-box #user-name", 5
[1.parallel:chunk1:firefox]       I fill field ".login-box #user-name", "standard_user"
[1.parallel:chunk1:firefox]       I wait for element ".login-box #password", 5
[1.parallel:chunk1:firefox]       I fill field ".login-box #password", "secret_sauce"
[1.parallel:chunk1:firefox]       I wait for element ".login-box #login-button", 5
[1.parallel:chunk1:firefox]       I click ".login-box #login-button"
[1.parallel:chunk1:firefox]       I wait 3
[1.parallel:chunk1:firefox]       I wait for element ".primary_header #shopping_cart_container", 10
[1.parallel:chunk1:firefox]       I see text equals "PRODUCTS", "#header_container .title"
[1.parallel:chunk1:firefox]     I wait 5
[1.parallel:chunk1:firefox]    Test Case #1 - Successfully add product to cart
[1.parallel:chunk1:firefox]    Open product
[1.parallel:chunk1:firefox]     products: openProduct "#item_1_title_link"
[1.parallel:chunk1:firefox]       I wait for element ".inventory_list #item_1_title_link", 5
[1.parallel:chunk1:firefox]       I click ".inventory_list #item_1_title_link"
[1.parallel:chunk1:firefox]       I wait 5
[1.parallel:chunk1:firefox]    Add product to cart.
[1.parallel:chunk1:firefox]     productItem: addToCart
[1.parallel:chunk1:firefox]       I wait for element ".inventory_details_desc_container button", 5
[1.parallel:chunk1:firefox]       I click ".inventory_details_desc_container button"
[1.parallel:chunk1:firefox]       I wait 5

```

<p>Successfully passed Test Case, would have the following input inside the Console Window.</p>

![Passed Spec](images\successfullpass.PNG)

<p>Failed Test Case, would have the following input inside Console, with Stack Trace and Exception Error included.</p>

![Failed Spec](images\failedSpec.PNG)