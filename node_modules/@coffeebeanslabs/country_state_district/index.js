let getAllCountries = () => {
  return require('./country.json');
}
module.exports.getAllCountries = getAllCountries;

let getAllStates = () => {
  return require('./state.json');
}
module.exports.getAllStates = getAllStates;

let getStatesByCountryId = (id) => {
  let states = indexBy(getAllStates(), 'country_id');
  return states[id];
}
module.exports.getStatesByCountryId = getStatesByCountryId;

let getAllDistricts = () => {
  return require('./city.json');
}
module.exports.getAllDistricts = getAllDistricts;

let getDistrictsByStateId = (id) => {
  let district = indexBy(getAllDistricts(), 'state_id');
  return district[id];
}
module.exports.getDistrictsByStateId = getDistrictsByStateId;


let indexBy = (array_val, key) => {
  let returnVal = {};
  array_val.forEach(item => {
    if(returnVal[item[key]]) {
      returnVal[item[key]].push(item)
    } else {
      returnVal[item[key]] = [item]
    }
  })
  return returnVal;
}
