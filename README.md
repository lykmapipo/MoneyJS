# MoneyJS

[![Build Status](https://travis-ci.org/lykmapipo/MoneyJS.svg?branch=master)](https://travis-ci.org/lykmapipo/MoneyJS)

Nodejs library to represent monetary amounts.

*Note: Instances of Money are immutable and each arithmetic operation will return a new instance of the money object.*

## Installation
```sh
$ npm install --save moneyjs
```

## Usage
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = new Money(12,Money.USD,new Date())
...
//continue with money usage see API guide
...
```

## API

### Configuration

#### `Money.BASE`
Set a base currency to be used with `Money`. Default to `USD`. Currency value to set must be obtained from `Money` static currencies helper. `Money.BASE` is heavily used in `exchanging` money instance from one currency to another.

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
var rates = {USD:1,TZS:1900,KES:90};
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
Return new instance of money with amount `set-ed` to zero, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.ZERO;
...
```


#### `Money.ONE`
Return new instance of money with amount `set-ed` to one, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.ONE;
...
```

#### `Money.TEN`
Return new instance of money with amount `set-ed` to ten, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.TEN;
...
```

#### `Money.TWENTY`
Return new instance of money with amount `set-ed` to twenty, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.TWENTY;
...
```

#### `Money.FIFTY`
Return new instance of money with amount `set-ed` to fifty, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.FIFTY;
...
```

#### `Money.HUNDRED`
Return new instance of money with amount `set-ed` to hundred, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.HUNDRED;
...
```

#### `Money.THOUSAND`
Return new instance of money with amount `set-ed` to thousand, currency set to  [Money base currency]() and `time` set to current timestamp.

Example
```js
//require money
var Money = require('moneyjs');

//instantiate a new money
var price = Money.THOUSAND;
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