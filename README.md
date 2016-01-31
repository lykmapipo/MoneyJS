# MoneyJS

[![Build Status](https://travis-ci.org/lykmapipo/MoneyJS.svg?branch=master)](https://travis-ci.org/lykmapipo/MoneyJS)

Nodejs library to represent monetary amounts.

*Note: Instances of Money are immutable and each arithmetic operation will return a new instance of the money object.*

## Installation
```sh
$ npm install --save async lodash moneyjs
```

## Usage
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var purchasePrice = new Money(12,Money.USD,new Date())
var margin = new Money(156,Money.TZS,new Date());

//compute selling price
//by adding purchase price and margin
purchasePrice.plus(margin, function(error,sellingPrice){
   ... 
});

var profit = Money.THOUSAND;
var tax = Money.FIFTY;
//compute net profit by subtract tax from profit
profit.minus(tax,function(error,netProfit){
    ...
});

//check if net profit is zero
netProfit.isZero();

//check if net profit is negative
netProfit.isNegative();

//check if net profit is positive
netProfit.isPositive();

var expectedProfit = Money.HUNDRED;

//check if net profit is greater than
//expected profit
netProfit.isGreaterThan(expectedProfit);

//check if net profit is less than
//expected profit
netProfit.isLessThan(expectedProfit);

//check if net profit is equal to
//expected profit
netProfit.isEqualTo(expectedProfit);

//exchange net profit to TZS
nextProfit.exchangeTo(Money.TZS,function(error,exchangedNetProfit){
    ...
});

...

```

## API

### Configuration

#### `Money.BASE`
Set a base currency to be used with `Money`. Default to `Money.USD`. Currency value to set must be obtained from `Money` static currencies helper. `Money.BASE` is heavily used in `exchanging` money instance from one currency to another.

Example
```js
//require money
var Money = require('moneyjs');

//set base currency
Money.BASE = Money.USD
...
//continue with money usage
```


#### `Money.getExchangeRates(date,done)`
Used to get `exchange rates` when `exchange` money instance from one currency to another. This method must be `ovverided` if exchanging operation is going to be used. `date` respresent a date when the money instance has been created. This will allow you to fetch or provide exchange rates of that exactly moment or otherwise.

*Note: Returned exchange rates must be in the format `{USD:1,TZS:1900,KES:90}`;*

Example of implementation
```js
var rates = {
    USD: 1,
    TZS: 1900,
    KES: 90
};

function getExchangeRates(date,done){
    //fetch exchange rates
    //from API or anywhere else
    //based on date passed
    done(null,rates);
}

//then set it to money
Money.getExchangeRates = getRates;
``` 

### Instance creation

#### `new Money(amount,currency,date)`
Instantiate a new instance of money with `amount` you want to set on money, a `currency` to set on money and a `date` when this money created, if not provided will default to `new Date()`

```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = new Money(12,Money.USD,new Date())
...
```

#### `Money.ZERO`
Return new instance of money with amount `set-ed` to zero, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.ZERO;
...
```


#### `Money.ONE`
Return new instance of money with amount `set-ed` to one, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.ONE;
...
```

#### `Money.TEN`
Return new instance of money with amount `set-ed` to ten, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.TEN;
...
```

#### `Money.TWENTY`
Return new instance of money with amount `set-ed` to twenty, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.TWENTY;
...
```

#### `Money.FIFTY`
Return new instance of money with amount `set-ed` to fifty, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.FIFTY;
...
```

#### `Money.HUNDRED`
Return new instance of money with amount `set-ed` to hundred, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.HUNDRED;
...
```

#### `Money.THOUSAND`
Return new instance of money with amount `set-ed` to thousand, currency set to  [Money base currency](#moneybase) and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.THOUSAND;
...
```

### Arithmetic Operations

#### `multiply(multiplier)`, `multiplyBy(multiplier)`
Perform scalar multiplication on the amount of money instance. It return new money instance holding result of operation

Example
```js
var Money = require('moneyjs')

var price = new Money(12, Money.USD);
price = price.multiplyBy(4); //price.multiply(4);
...
```

#### `divide(divisor)`, `divideBy(multiplier)`
Perform scalar division on the amount of money instance. It return new money instance holding result of operation

Example
```js
var Money = require('moneyjs')

var price = new Money(12, Money.USD);
price = price.divideBy(4); //price.divide(4);
...
```

#### `add(money)`, `plus(money)`
Add another money instance to this money instance. It returns new money instance holding result of operation. The returned money instance will have the currency of the money instance where plus has been invoked.

*Note: Instance of money with different currencies are supported*

Example
```js
var Money = require('moneyjs')

var price = new Money(12, Money.USD);
price.plus(new Money(2, Money.TZS),function(error, pricePlusAddition){
    ...
}); 
...
```

If `two money instances` are of same currency you may opt for synchronous `addition`

Example
```js
var price = new Money(12, Money.USD);
var tax = new Money(2, Money.USD);
var priceAfterTax = price.plus(tax);
``` 

#### `minus(money)`, `subtract(money)`
Subtract another money instance from this money instance. It returns new money instance holding result of operation.The returned money instance will have the currency of the money instance where minus has been invoked.

*Note: Instance of money with different currencies are supported*

Example
```js
var Money = require('moneyjs')

var price = new Money(12, Money.USD);
price = price.minus(new Money(2, Money.TZS),function(error,money){
    ...    
}); 
...
```

If `two money instances` are of same currency you may opt for synchronous `subtraction`

Example
```js
var profit = new Money(12, Money.USD);
var tax = new Money(2, Money.USD);
var netProfit = profit.minus(tax);
```

### Logical Operations

#### `equals(money)`, `equalTo(money)`
Check if this money instance is equal to the given money instance. It returns `boolean true` otherwise `boolean false`

Example
```js
var Money = require('moneyjs');

var tax = new Money(200, Money.USD);
var rent = new Money(1200, Money.USD);
var any = new Money(1200, Money.USD);

expect(tax.equals(tax)).to.be.true;
expect(tax.equals(rent)).to.be.false;
expect(tax.equals(any)).to.be.false;

expect(rent.equal(rent)).to.be.true;
expect(rent.equal(any)).to.be.true;
expect(rent.equal(tax)).to.be.false;

...
```

#### `lessThan(money)`, `isLessThan(money)`
Check if this money instance is less than given money instance. It returns `boolean true` if so otherwise `boolena false`

Example
```js
var Money = require('moneyjs');

var price = new Money(12, Money.USD);
var tax = new Money(2, Money.USD);

expect(tax.isLessThan(price)).to.be.true;
expect(price.isLessThan(tax)).to.be.false;

...
```

#### `greaterThan(money)`, `isGreaterThan(money)`
Check if this money instance is less than given money instance. It returns `boolean true` if so otherwise `boolena false`

Example
```js
var Money = require('moneyjs');

var price = new Money(12, Money.USD);
var tax = new Money(2, Money.USD);

expect(price.isGreaterThan(tax)).to.be.true;
expect(tax.isGreaterThan(price)).to.be.false;

...
```

#### `isZero(money)`
Check if this money instance has amount equal to zero.

Example
```js
var Money = require('moneyjs');

var tax = new Money(0, Money.USD);
var any = new Money(0.00, Money.USD);
var rent = new Money(1200, Money.USD);

expect(tax.isZero()).to.be.true;
expect(any.isZero()).to.be.true;
expect(rent.isZero()).to.be.false;

...
```

#### `isNegative(money)`
Check if this money instance has amount which is less than zero.

Example
```js
var Money = require('moneyjs')
var profit = new Money(1200, Money.USD);
var loss = new Money(-1200, Money.USD);

expect(profit.isNegative()).to.be.false;
expect(loss.isNegative()).to.be.true;

...
```

#### `isPositive(money)`
Check if this money instance has amount greater than zero.

Example
```js
var Money = require('moneyjs');

ar profit = new Money(1200, Money.USD);
var loss = new Money(-1200, Money.USD);

expect(profit.isPositive()).to.be.true;
expect(loss.isPositive()).to.be.false;

...
```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```


## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.


## Licence
The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 