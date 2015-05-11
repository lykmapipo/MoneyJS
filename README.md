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