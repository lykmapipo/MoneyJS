'use strict';

//dependecnies
var path = require('path');
var expect = require('chai').expect;

//import money javascript type
var Money = require(path.join(__dirname, '..', 'index'));

describe('Money', function() {

    it('should be able a function', function(done) {
        expect(Money).to.be.a('function');
        done();
    });

    it('should be able to get currency data from it', function(done) {

        expect(Money.USD).to.exist;
        expect(Money.USD.code).to.be.equal('USD');

        done();
    });

    it('should be able to create new instance of money', function(done) {
        var price = new Money(1200, Money.USD);

        expect(price.amount.toString()).to.be.equal('1200');
        expect(price.currency.code).to.be.equal('USD');

        done();
    });

    it('should be able to compare two money instance for equality', function(done) {
        var tax = new Money(200, Money.USD);
        var rent = new Money(1200, Money.USD);
        var any = new Money(1200, Money.USD);

        expect(tax.equals(tax)).to.be.true;
        expect(tax.equals(rent)).to.be.false;
        expect(tax.equals(any)).to.be.false;

        expect(rent.equal(rent)).to.be.true;
        expect(rent.equal(any)).to.be.true;
        expect(rent.equal(tax)).to.be.false;

        done();
    });

    it('should be able to check if money is zero', function(done) {
        var tax = new Money(0, Money.USD);
        var any = new Money(0.00, Money.USD);
        var rent = new Money(1200, Money.USD);

        expect(tax.isZero()).to.be.true;
        expect(any.isZero()).to.be.true;
        expect(rent.isZero()).to.be.false;

        done();
    });

    it('should be able to check if money is positive value', function(done) {
        var profit = new Money(1200, Money.USD);
        var loss = new Money(-1200, Money.USD);

        expect(profit.isPositive()).to.be.true;
        expect(loss.isPositive()).to.be.false;

        done();
    });

    it('should be able to check if money is negative value', function(done) {
        var profit = new Money(1200, Money.USD);
        var loss = new Money(-1200, Money.USD);

        expect(profit.isNegative()).to.be.false;
        expect(loss.isNegative()).to.be.true;

        done();
    });

    it('should be able to return string representation of money instance', function(done) {
        var price = new Money(45.6, Money.USD);

        expect(price.toString()).to.be.equal('USD 45.6');

        done();
    });


    it('should be able to return hash as valueOf representation of money instance', function(done) {
        var date = new Date();
        var price = new Money(45.6, Money.USD, date);

        var valueOf = {
            amount: 45.6,
            currency: 'USD',
            time: date
        };

        expect(price.valueOf()).to.be.eql(valueOf);

        done();
    });


    it('should be able to return JSON representation of money instance', function(done) {
        var date = new Date();
        var price = new Money(45.6, Money.USD, date);

        var toJSON = {
            amount: 45.6,
            currency: 'USD',
            time: date
        };

        expect(JSON.stringify(price)).to.be.eql(JSON.stringify(toJSON));

        expect(price.toJSON()).to.be.eql(toJSON);

        done();
    });


    describe('Arithmetic Operations', function() {
        it('should be able to perform scalar multiplication on money instance', function(done) {
            var price = new Money(12, Money.USD);
            price = price.multiplyBy(4);

            expect(price.amount.toString()).to.be.equal('48');
            expect(price.currency.code).to.be.equal('USD');
            done();

        });


        it('should be able to perform scalar division on money instance', function(done) {
            var price = new Money(12, Money.USD);
            price = price.divideBy(4);

            expect(price.amount.toString()).to.be.equal('3');
            expect(price.currency.code).to.be.equal('USD');
            done();

        });


        it('should be able to perform addition on two money instance of the same currency', function(done) {
            var price = new Money(12, Money.USD);
            var tax = new Money(2, Money.USD);
            var priceAfterTax = price.plus(tax);

            expect(priceAfterTax.amount.toString()).to.be.equal('14');
            expect(price.currency.code).to.be.equal('USD');

            done();

        });

        it('should be able to perform subtraction on two money instance of the same currency', function(done) {
            var price = new Money(12, Money.USD);
            var tax = new Money(2, Money.USD);
            var netProfit = price.minus(tax);

            expect(netProfit.amount.toString()).to.be.equal('10');
            expect(netProfit.currency.code).to.be.equal('USD');

            done();

        });
    });


    describe('Logical Operations', function() {
        it('should be able to check if one money instance is greater than the other', function(done) {
            var price = new Money(12, Money.USD);
            var tax = new Money(2, Money.USD);

            expect(price.isGreaterThan(tax)).to.be.true;
            expect(tax.isGreaterThan(price)).to.be.false;

            done();
        });

        it('should be able to check if one money instance is less than the other', function(done) {
            var price = new Money(12, Money.USD);
            var tax = new Money(2, Money.USD);

            expect(tax.isLessThan(price)).to.be.true;
            expect(price.isLessThan(tax)).to.be.false;

            done();
        });

    });


    describe('Precision and Significant Figures', function() {
        it('should be able fix money instance into fixed number of decimal places', function(done) {
            var price = new Money(45.6, Money.USD);
            var rent = new Money(45.6123, Money.USD);

            var fixedPrice = price.toFixed();
            var fixedRent = rent.toFixed(3);

            expect(fixedPrice.amount.toString()).to.be.equal('45.6');
            expect(fixedRent.amount.toString()).to.be.equal('45.612');

            done();
        });

        it('should be able convert a money instance into specified number of significant figures', function(done) {
            var price = new Money(45.6, Money.USD);
            var rent = new Money(45, Money.USD);

            var precisePrice = price.toPrecision();
            var preciseRent = rent.toPrecision(1);

            expect(precisePrice.amount.toString()).to.be.equal('45.6');
            expect(preciseRent.amount.toString()).to.be.equal('50');

            done();
        });

    });


    describe('Exchange or Convertion', function() {

        it('should have a default base currency', function(done) {
            expect(Money.BASE).to.be.equal(Money.USD);
            done();
        });

        it('should have ability to get exchange rates', function(done) {
            var exchangeRates = {
                USD: 1,
                KES: 95,
                TZS: 1900
            };

            //ovveride `getExchangeRates`
            Money.getExchangeRates = function(date, done) {
                done(null, exchangeRates);
            };

            expect(Money.getExchangeRates).to.be.a('function');

            Money.getExchangeRates(new Date(), function(error, rates) {

                expect(rates).to.eql(exchangeRates);

                done(error, rates);
            });
        });

        it('should return it self when converted to same currency', function(done) {
            var date = new Date();
            var money = new Money(1900, Money.TZS, date);

            //exchange now
            money.exchangeTo(Money.TZS, function(error, money) {

                expect(money.amount.toString()).to.equal('1900');
                expect(money.time).to.equal(date);
                expect(money.currency.code).to.equal('TZS');

                done(error, money);
            });

        });

        it('should be able to exchange money instance to base currency', function(done) {
            var date = new Date();
            var money = new Money(950, Money.TZS, date);

            //exchange now
            money.exchangeTo(Money.USD, function(error, money) {

                expect(money.amount.toString()).to.be.equal('0.5');
                expect(money.time).to.be.equal(date);
                expect(money.currency.code).to.be.equal('USD');

                done(error, money);
            });

        });

        it('should be able to exchange money instance to another currency', function(done) {
            var date = new Date();
            var money = new Money(1800, Money.TZS, date);


            //exchange now
            money.exchangeTo(Money.KES, function(error, money) {

                expect(money.amount.toString()).to.be.equal('90');
                expect(money.time).to.be.equal(date);
                expect(money.currency.code).to.be.equal('KES');

                done(error, money);
            });

        });

    });


    describe('Static Helpers', function() {
        it('should be able to return a new money instance with zero amount and base currency', function(done) {
            var money = Money.ZERO;

            expect(money.amount.toString()).to.equal('0');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });

        it('should be able to return a new money instance with one amount and base currency', function(done) {
            var money = Money.ONE;

            expect(money.amount.toString()).to.equal('1');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });

        it('should be able to return a new money instance with ten amount and base currency', function(done) {
            var money = Money.TEN;

            expect(money.amount.toString()).to.equal('10');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });

        it('should be able to return a new money instance with twenty amount and base currency', function(done) {

            var money = Money.TWENTY;

            expect(money.amount.toString()).to.equal('20');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });

        it('should be able to return a new money instance with fifty amount and base currency', function(done) {
            var money = Money.FIFTY;

            expect(money.amount.toString()).to.equal('50');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });

        it('should be able to return a new money instance with hundred amount and base currency', function(done) {
            var money = Money.HUNDRED;

            expect(money.amount.toString()).to.equal('100');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });

        it('should be able to return a new money instance with thousand amount and base currency', function(done) {
            var money = Money.THOUSAND;

            expect(money.amount.toString()).to.equal('1000');
            expect(money.currency.code).to.equal(Money.BASE.code);

            done();
        });
    });
});