'use strict';

const config = require('codeceptjs').config.get();

Feature('Login');

Scenario('Successful login', ({ I, loginPage }) => {
    I.login(config.login.testUser1);
    loginPage.testLoginFunction();
});

Scenario('No credentials', ({ I, loginPage }) => {
    I.amOnPage(loginPage.baseUrl);

    I.fillField(loginPage.userNameLocator, '');
    I.fillField(loginPage.passwordLocator, '');
    I.click(loginPage.submitBtn);

    I.seeTextEquals('Epic sadface: Username is required', loginPage.errorLabel);
});

Scenario('Invalid email format', ({ I, loginPage }) => {
    // TODO
});

Scenario('Too short password', ({ I, loginPage }) => {
    // TODO
});

Scenario('Wrong password', ({ I, loginPage }) => {
    I.amOnPage(loginPage.baseUrl);

    I.fillField(loginPage.userNameLocator, loginPage.userName);
    I.fillField(loginPage.passwordLocator, '124567');
    I.click(loginPage.submitBtn);

    I.seeTextEquals('Epic sadface: Username and password do not match any user in this service', loginPage.errorLabel);
});
