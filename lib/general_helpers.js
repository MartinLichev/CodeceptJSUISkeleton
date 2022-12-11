'use strict';

const config = require('codeceptjs').config.get();
const { I } = inject();

class GeneralHelpers {
    constructor() {

    };

	formatDateAndTime(offset) {
		// example: "2021-11-25 14:25:35"
		
		let currentDateAndTime = new Date();
		let newDateAndTime = new Date();

		newDateAndTime.setTime(currentDateAndTime.getTime() - currentDateAndTime.getTimezoneOffset() * 60000 + offset * 60000);

		let dateAndTimeArray = newDateAndTime.toISOString().slice(0, 19).split('T');
		return dateAndTimeArray[0].concat(' ', dateAndTimeArray[1]);
	};

	generateCampaignId() {
		let time = Date.now();
		return Math.floor(time / 1000);
	};

    clickOnBody() {
        I.waitForElement('body', config.waitPeriod.large);
        I.click('body');
    };

    /**
     * @param {string} message
     * @param {string} toBeReplaced
     * @param {string} entityChar
     */
     replaceTextWithEntity(message, toBeReplaced, entityChar) {
        return message.replaceAll(toBeReplaced, entityChar);
    }
}

/**
 * Export as instance, so it can be injected and used directly
 */
 module.exports = new GeneralHelpers();

  
