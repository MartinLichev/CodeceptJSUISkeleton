const config = require('codeceptjs').config.get();
const { I } = inject();

module.exports = {
    baseUrl: config.helpers.Playwright.url,
    userNameLocator: '.login-box #user-name',
    passwordLocator: '.login-box #password',
    submitBtn: '.login-box #login-button',
    errorLabel: '.login-box .error-message-container h3',
    userName: config.login.testUser1.username,
    userPassword: config.login.testUser1.password,

    testLoginFunction() {
        I.say('Test login helper function!');
    }
}
