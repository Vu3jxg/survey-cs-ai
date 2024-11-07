# country_state_district
> By this package you can get a list of countries, states and districts.
> This package also allow to get districts and states in hindi and marathi also.




**Note:** This plugin will return a list of countries, states and districts by using our few methods. This will work with Node.js
=======

## Installation

```sh
npm i @coffeebeanslabs/country_state_district
```

## Documentation

### Get list of countries

It returns the details of the countries.

```js
let country_state_district = require('@coffeebeanslabs/country_state_district');

let countries = country_state_district.getAllCountries();
```

**Return value:**
```json
[
  { "id": 1, "name": "India" }
]
```

### Get list of states

It returns the details of the states.

```js
let country_state_district = require('@coffeebeanslabs/country_state_district');

let states = country_state_district.getAllStates();
```

**Return value:**
```json
[
  { "id": 32, "name": "Tamil Nadu", "en_name": "Tamil Nadu", "hi_name": "तमिलनाडु", "mr_name": "तामिळनाडू", "country_id": 1 }
]
```

### Get list of states using Country ID

It accepts a valid `Country ID` and returns _State Details_

```js
let country_state_district = require('@coffeebeanslabs/country_state_district');

let states = country_state_district.getStatesByCountryId(1);
```

**Return value:**
```json
[
  { "id": 32, "name": "Tamil Nadu", "en_name": "Tamil Nadu", "hi_name": "तमिलनाडु", "mr_name": "तामिळनाडू", "country_id": 1 }
]
```

### Get list of districts

It returns the details of the states.

```js
let country_state_district = require('@coffeebeanslabs/country_state_district');

let districts = country_state_district.getAllDistricts();
```

**Return value:**
```json
[
    { "id": 32, "name": "Tamil Nadu", "en_name": "Tamil Nadu", "hi_name": "तमिलनाडु", "mr_name": "तामिळनाडू", "country_id": 1 }
]
```

### Get list of districts using State ID

It accepts a valid `State ID` and returns _District Details_

```js
let country_state_district = require('@coffeebeanslabs/country_state_district');

let districts = country_state_district.getDistrictsByStateId(32);
```

**Return value:**
```json
[
  { "id": 578, "name": "Thoothukudi", "en_name": "Thoothukudi", "mr_name": "थुथुकुडी", "hi_name": "थुथुकुडी", "state_id": 32 }
]
```
