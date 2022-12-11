Requirements: nodejs version >= `16.3.0`
`CodeceptJS Docs`: https://codecept.io/helpers/Playwright/#playwright
`Allure Reporter`: https://docs.qameta.io/allure/

1. git clone this repo to a directory on your system.
2. Run `npm install`.
3. To run all tests: `npm run codeceptjs` - running in verbose mode.
4. To run tests in parallel: `npm run codeceptjs:parallel` - configured in codecept.conf.js
5. To run tests with change ViberSender functionality to ViberTest/ViberTest2Way: `npm run codeceptjs:parallel ViberTest` or `npm run codeceptjs:parallel ViberTest2Way`
6. To run test in parallel, using Allure reports: `npm run codeceptjs:allure:parallel`
7. To open the generated Allure report run`allure serve allure-results`
