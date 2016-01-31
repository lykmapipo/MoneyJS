'use strict';


//dependencies
var path = require('path');
var async = require('async');
var _ = require('lodash');
var currencies = require(path.join(__dirname, 'currencies'));
var BigDecimal = require('big.js');


/**
 * @constructor
 * @description Javascript money implementation that borrows a lot from others.
 *              The created money instances are immutable object.
 *
 * @param {Number|BigDecimal} [amount] money value. default to 0
 * @param {String|Object} [currency] money currency. default to Money.BASE
 * @param {Date} [time] a time of creation of Money. default to new Date
 * @public
 */
function Money(amount, currency, time) {

    //if no arguments provided instance money with zero amount
    if (arguments.length === 0) {
        amount = new BigDecimal(0);
        currency = Money.BASE;
        this.time = new Date();
    }

    //instance Money from only amount
    var onlyAmountProvided =
        arguments.length === 1 &&
        (amount instanceof BigDecimal || !isNaN(amount));

    if (onlyAmountProvided) {
        currency = Money.BASE;
        this.time = new Date();
    }

    //set a date when this money has been created
    //Note!: Money value flactuate with time
    //
    //highly used in corverting this money instance to
    //other instances
    if (arguments.length === 3) {
        this.time = time;
    } else {
        this.time = new Date();
    }

    //use big.js to track amount
    this.amount = new BigDecimal(amount);

    //reference the whole currency details
    this.currency = currency;

    //freeze object to make it mutable
    //See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    Object.freeze(this);
}


/**
 * @function
 * @description check if this money instance is equal to other instance
 * @param {Money} other money instance to compare with this instance of money
 * @returns {boolean} true if both have equal currency and equal amount, 
 *                         otherwise false
 * @private
 */
Money.prototype.equals =
    Money.prototype.isEqual =
    Money.prototype.isEqualTo =
    Money.prototype.equalTo =
    Money.prototype.equal =
    Money.prototype.eq = function(other) {
        return this.amount.eq(other.amount) &&
            (_.isEqual(this.currency, other.currency));
    };


/**
 * @function
 * @description check if this money instance is less than the other money instance
 * @param {Money} other money instance to compare with this instance of money
 * @returns {boolean} true if this money instance is less, otherwise false
 * @private
 */
Money.prototype.isLessThan =
    Money.prototype.lessThan =
    Money.prototype.lt = function(other) {
        //check if they have same currency
        if (_.isEqual(this.currency, other.currency)) {
            return this.amount.lt(other.amount);
        } else {
            //TODO handle different currency format
            return false;
        }
    };


/**
 * @function
 * @description check if this money instance is greater than the other money 
 *              instance
 * @param {Money} other money instance to compare with this instance of money
 * @returns {boolean}  true if this money instance is greater, otherwise false
 * @private
 */
Money.prototype.isGreaterThan =
    Money.prototype.greaterThan =
    Money.prototype.gt = function(other) {
        //check if they have same currency
        if (_.isEqual(this.currency, other.currency)) {
            return this.amount.gt(other.amount);
        } else {
            //TODO handle different currency format
            return false;
        }
    };


/**
 * @function
 * @description check if this money instance has zero amount.
 * @returns {boolean} true if this money instance has zero amount, 
 *                         otherwise false
 * @private
 */
Money.prototype.isZero = function() {
    return this.amount.eq(new BigDecimal(0));
};


/**
 * @function
 * @description check if this money instance has amount which positive.
 * @returns {boolean} true if this money instance has amount which is positive, 
 *                         otherwise false
 * @private
 */
Money.prototype.isPositive = function() {
    return this.amount.gt(new BigDecimal(0));
};


/**
 * @function
 * @description check if this money instance has amount which is negative.
 * @returns {boolean} true if this money instance has amount which is negative, 
 *                         otherwise false
 * @private
 */
Money.prototype.isNegative = function() {
    return !this.isPositive();
};


/**
 * @function
 * @description perform scalar multiplication on the money instance using 
 *              provided the multiplier and return a new Money instance 
 *              that holds the result of the operation.
 * @param {Number} multiplier a scalar multiplier to multiply this money with
 * @returns {Money} a new instance of money which hold result of operation
 * @private
 */
Money.prototype.multiply = Money.prototype.multiplyBy = function(multiplier) {
    return new Money(this.amount.times(multiplier), this.currency);
};


/**
 * @function
 * @description perform scalar division on the money instance using provided 
 *              divisor and return a new Money instance that holds the 
 *              result of the operation.
 * @param {Number} divisor a scalar divisor to divide this money with
 * @returns {Money} a new instance of money which hold the result of operation
 * @private
 */
Money.prototype.divide = Money.prototype.divideBy = function(divisor) {
    return new Money(this.amount.div(divisor), this.currency);
};


/**
 * @function
 * @description add other money instance into this money instance and return new
 *              money instance whose currency set to this money instance currency
 * @param {Money} other other money instance to add to this money instance
 * @param {Function} [done] a callback to invoke on success or failure
 * @returns {Money} a new money instance which hold the result of operation
 */
Money.prototype.add =
    Money.prototype.plus = function(other, done) {
        //this is of money instance context
        var self = this;

        //other money instance has the same
        //currency as this money instance
        if (_.isEqual(self.currency, other.currency)) {
            var result =
                new Money(self.amount.plus(other.amount), self.currency);

            //return async
            if (done && typeof done === 'function') {
                done(null, result);
            }

            //return synchronous
            else {
                return result;
            }
        }

        //other have differnt currency to this
        //money instance
        else {
            async.waterfall([
                function convertOtherToThisMoneyCurrency(next) {
                    other.convertTo(self.currency, next);
                },
                function sum(exchanged, next) {
                    next(null,
                        new Money(
                            self.amount.plus(exchanged.amount),
                            self.currency)
                    );
                }
            ], done);
        }
    };


/**
 * @function
 * @description subtract other money instance from this money instance and 
 *              return a new Money instance whose currency is set to this money
 *              instance currency.
 * @param {Money} other other money instance to add to this money instance
 * @returns {Money} a new money instance which hold the result of operation
 * @private
 */
Money.prototype.subtract =
    Money.prototype.minus = function(other, done) {
        //this if of money instance context
        var self = this;

        //other money instance has the same
        //currency as this money instance
        if (_.isEqual(self.currency, other.currency)) {
            var result =
                new Money(self.amount.minus(other.amount), self.currency);

            //return async
            if (done && typeof done === 'function') {
                done(null, result);
            }

            //return synchronous
            else {
                return result;
            }
        }

        //other have differnt currency to this
        //money instance
        else {
            async.waterfall([
                function convertOtherToThisMoneyCurrency(next) {
                    other.convertTo(self.currency, next);
                },
                function subtract(exchanged, next) {
                    next(null,
                        new Money(
                            self.amount.minus(exchanged.amount),
                            self.currency)
                    );
                }
            ], done);
        }

    };


/**
 * @function
 * @description create a new money instance whose amount is fixed to given numbers
 *              of decimal places
 * @param  {Number} dp number of decimal places to fix in this money instance
 * @return {Money}     a new money instance with required fixed decimal places
 */
Money.prototype.toFixed = function(dp) {
    return new Money(this.amount.toFixed(dp), this.currencyDetails);
};


/**
 * @function
 * @description create a new money instance whose amount is of provided 
 *              significant figures
 * @param  {Number} dp number of fignificant figures to use
 * @return {Money}     a new money instance with required significant figures
 */
Money.prototype.toPrecision = function(dp) {
    return new Money(this.amount.toPrecision(dp), this.currencyDetails);
};


/**
 * @function
 * @description convert this money instance to its string representation
 * @return {String} a string representation of this money instance
 * @private
 */
Money.prototype.toString = function() {
    return this.currency.code + ' ' + this.amount.toString();
};


/**
 * @function
 * @description convert this money instance to its JSON representation
 * @return {Object} a JSON representation of this money instance
 * @private
 */
Money.prototype.toJSON =
    Money.prototype.asJSON = function() {
        return {
            amount: Number(this.amount.toJSON()),
            currency: this.currency.code,
            time: this.time
        };
    };


/**
 * @function
 * @description compute valueOf representation of this money instance
 * @return {Object} a valueOf presentation of this money instance
 * @private
 */
Money.prototype.valueOf = function() {
    return this.toJSON();
};


/**
 * @function
 * @description compute object representation of this money instance
 * @return {Object} object representation of this money
 * @private
 */
Money.prototype.toObject =
    Money.prototype.asObject =
    Money.prototype.toObj = function() {
        return this.toJSON();
    };


/**
 * @description exchange this money instance to another currency
 * @param  {Object}   to a currency to exchange this money instance to
 * @param  {Function} done     a callback to be invoked after exchange
 * @return {Money}            a new Money instance with currency equal to the
 *                              required exchange
 */
Money.prototype.exchange =
    Money.prototype.convert =
    Money.prototype.convertTo =
    Money.prototype.exchangeTo = function(to, done) {
        var self = this;

        //back-off if exchange is between same currency
        if (self.currency.code === to.code) {
            done(null, self);
        }

        //otherwise continue with exchanging
        else {
            async
            .waterfall([
                    //get exchange rates
                    function getExchangeRates(next) {
                        Money.getExchangeRates(self.time, next);
                    },

                    //check if base currency is in exchange rates
                    function checkBaseRateExistance(rates, next) {
                        var baseRateExists =
                            rates[Money.BASE.code] && (rates[Money.BASE.code] === 1);

                        if (!baseRateExists) {
                            next(new Error(
                                'Invalid exchange rates. Base currency %s is not available',
                                Money.BASE.code
                            ));
                        } else {
                            next(null, rates);
                        }
                    },

                    //check if `this` money instance currency code 
                    //and `to` currency code exist in exchange rates
                    function exchangeRatesExist(rates, next) {
                        var ratesExist =
                            rates[self.currency.code] && rates[to.code];

                        if (!ratesExist) {
                            next(new Error(
                                'Invalid exchange rates. %s and %s are not available',
                                self.currency.code,
                                to.code
                            ));
                        } else {
                            next(null, rates);
                        }
                    },

                    //exchange
                    function exchange(rates, next) {
                        var amount;

                        // If `to` currency.code === Money.BASE.code
                        // return `this` amount divide by the rate of 
                        // `this` currency.code
                        if (to.code === Money.BASE.code) {
                            amount = self.amount.div(rates[self.currency.code]);
                            next(null, amount);
                        }

                        // Otherwise, return `this` amount times `to` rate 
                        // divide by the rate of `this` currency code to
                        // relative exchange rate between the two currencies 
                        else {
                            amount =
                                self
                                .amount
                                .times(rates[to.code])
                                .div(rates[self.currency.code]);

                            next(null, amount);
                        }
                    }
                ],
                function finish(error, amount) {
                    if (error) {
                        done(error);
                    } else {
                        done(null, new Money(amount, to, self.time));
                    }
                });
        }
    };


/**
 * @description export money js type
 * @type {Money}
 */
module.exports = Money;


/**
 * @description add currencies data into Money
 * @type {[type]}
 */
Money = _.extend(module.exports, currencies);


/**
 * @description set default base currency. 
 *              Check from prcess.env.BASE_CURRENCY else default to USD
 */
Money.BASE =
    process.env && process.env.BASE_CURRENCY ?
    Money[process.env.BASE_CURRENCY] :
    Money.USD;


/**
 * @description get new money instance with amount equal to zero and currency
 *              equal to base currency
 * @type {Money}
 */
Money.ZERO = new Money(0, Money.BASE, new Date());


/**
 * @description get new money instance with amount equal to one and currency
 *              equal to base currency
 * @type {Money}
 */
Money.ONE = new Money(1, Money.BASE, new Date());


/**
 * @description get new money instance with amount equal to ten and currency
 *              equal to base currency
 * @type {Money}
 */
Money.TEN = new Money(10, Money.BASE, new Date());


/**
 * @description get new money instance with amount equal to twenty and currency
 *              equal to base currency
 * @type {Money}
 */
Money.TWENTY = new Money(20, Money.BASE, new Date());


/**
 * @description get new money instance with amount equal to fifty and currency
 *              equal to base currency
 * @type {Money}
 */
Money.FIFTY = new Money(50, Money.BASE, new Date());


/**
 * @description get new money instance with amount equal to hundred and currency
 *              equal to base currency
 * @type {Money}
 */
Money.HUNDRED = new Money(100, Money.BASE, new Date());


/**
 * @description get new money instance with amount equal to thousand and currency
 *              equal to base currency
 * @type {Money}
 */
Money.THOUSAND = new Money(1000, Money.BASE, new Date());


/**
 * @description get exchanges rates to be used in exchanging one money to another
 *              
 *              Note: This must be overriden before using money for convertion/exchange.
 *              
 * @param  {Date} date exchange rate date
 * @param {Function} done a callback to be invoked with a hash of exchange rates
 * @return {Object} collection of exchange rate in format `{currency.code:vale}`
 *                             ir  
 */
Money.getExchangeRates = function(date, done) {
    return done(null, {});
};