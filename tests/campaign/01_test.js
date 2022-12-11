'use strict';

const config = require('codeceptjs').config.get();

const homepage = config.helpers.Playwright.url;
// if test fails, it will be retried 2 time
const retryCount = 2;



Feature('FEATURE #01');

Before(async ({ I }) => {
    I.wait(config.waitPeriod.medium);
    await I.login(config.login.testUser1);
    
    I.wait(config.waitPeriod.medium);
    // I.acceptCookies();
});

// #1 SMS - 5-reps-2-cols.xlsx + Test Reports:
Scenario('#1 Successfully add product to cart', async ({ I, products, productItem }) => {
    I.say('Test Case #1 - Successfully add product to cart');
    
    products.openProduct('#item_1_title_link');
    productItem.addToCart();
    productItem.openCart();
}).retry(retryCount);

Scenario('#2 Search specific product', async ({ I, products, productItem }) => {
    I.say('#2 Search specific product');
    
    products.openProduct('#item_1_title_link');
    productItem.addToCart();
    productItem.openCart();
}).retry(retryCount);



AfterSuite(({ I }) => {
    // TODO:
});