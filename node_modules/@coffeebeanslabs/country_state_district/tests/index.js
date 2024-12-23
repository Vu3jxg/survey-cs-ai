'use strict';

let expect = require('chai').expect;
let country_state_district = require('../index');

describe('Validate Country State District Package', function() {
  it('get-all-countries', function() {
    let countries = country_state_district.getAllCountries();
    expect(countries).to.deep.include({ id: 1, name: 'India' });
  });

  it('get-all-states', function() {
    let states = country_state_district.getAllStates();
    expect(states).to.deep.include({ id: 32, name: 'Tamil Nadu', country_id: 1 });
  });

  it('get-india-states', function() {
    let states = country_state_district.getStatesByCountryId(1);
    expect(states).to.deep.include({ id: 32, name: 'Tamil Nadu', country_id: 1 });
  });

  it('get-all-districts', function() {
    let districts = country_state_district.getAllDistricts();
    expect(districts).to.deep.include({ id: 99, name: 'Nalanda', state_id: 5 });
  });

  it('get-tamilnadu-districts', function() {
    let districts = country_state_district.getDistrictsByStateId(32);
    expect(districts).to.deep.not.include({ id: 99, name: 'Nalanda', state_id: 5 });
    expect(districts).to.deep.include({ id: 578, name: 'Thoothukudi', state_id: 32 });
  });
});
