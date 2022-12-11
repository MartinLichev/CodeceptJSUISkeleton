const config = require('codeceptjs').config.get();
const { loginPage } = inject();

/**
 * In here you can append custom step methods to 'I' object
 */
module.exports = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    async login(testUser) {
      const I = this;

      const userNameLocator = loginPage.userNameLocator;
      const passwordLocator = loginPage.passwordLocator;
      const submitBtn = loginPage.submitBtn;
      const shoppingCartLink = '.primary_header #shopping_cart_container';
      const productsTitle = '#header_container .title';

      I.amOnPage(config.helpers.Playwright.url);
      I.wait(config.waitPeriod.small);

      // Login
      I.waitForElement(userNameLocator, config.waitPeriod.medium);
      I.fillField(userNameLocator, testUser.username);

      I.waitForElement(passwordLocator, config.waitPeriod.medium);
      I.fillField(passwordLocator, testUser.password);
      
      I.waitForElement(submitBtn, config.waitPeriod.medium);
      I.click(submitBtn);

      // I am on Products page
      I.wait(config.waitPeriod.small);
      I.waitForElement(shoppingCartLink, config.waitPeriod.large);
      I.seeTextEquals('PRODUCTS', productsTitle);
      this.acceptCookies();
    },

    acceptCookies() {
      // TODO: 
    }
  });
}
