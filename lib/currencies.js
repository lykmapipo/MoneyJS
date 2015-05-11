'use strict';

//dependencies
var _ = require('lodash');

/**
 * @description store countries currencies details
 * @type {Object}
 */
var currencies = {};

//load Currency with all currencies data 
_.forEach(require('country-data').currencies.all, function(currency) {
    //add currency countries currencies
    currencies[currency.code] = currency;
});

/**
 * @description export currencies
 * @type {Object}
 */
module.exports = currencies;