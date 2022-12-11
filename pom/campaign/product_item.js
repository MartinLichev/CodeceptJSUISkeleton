const config = require('codeceptjs').config.get();
const { I, generalHelpers } = inject();

module.exports = {
    addToCartButton: '.inventory_details_desc_container button',
    openCartButton: '//a[contains(@class, "shopping")]',

    addToCart() {
        I.say('Add product to cart.');
        I.waitForElement(this.addToCartButton, config.waitPeriod.medium);
        I.click(this.addToCartButton);
        I.wait(config.waitPeriod.medium);
        // TODO

        // Helper methods examples, delete:
        let date = generalHelpers.formatDateAndTime(1.5);
        let campaignID = generalHelpers.generateCampaignId();
        I.say(`Date helper test: ${date}`);
        I.say(`Campaign ID helper test: ${campaignID}`);
    },
    openCart() {
        I.say('Open cart.');
        I.click(this.openCartButton);
        I.say('Cart is opened!');
        // TODO
    }
};
