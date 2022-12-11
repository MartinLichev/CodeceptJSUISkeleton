const config = require('codeceptjs').config.get();
const { I } = inject();

module.exports = {
    productsList: '.inventory_list',

    /**
     * @param {String} id 
     */
    openProduct(id) {
        const productSelector = `.inventory_list ${id}`;
        I.say('Open product');

        I.waitForElement(productSelector, config.waitPeriod.medium);
        I.click(productSelector);

        I.wait(config.waitPeriod.medium)
    },
};
