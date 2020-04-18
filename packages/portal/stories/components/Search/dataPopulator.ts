import faker from 'faker';
export const populateCities = (numberOfCities) =>{
  const result = [];
  for(let i =0;i<numberOfCities; i++){
    result.push(faker.address.city());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
}
export const populateFirstName = (numberOfCities) =>{
  faker.locale = "pl";
  const result = [];
  for(let i =0;i<numberOfCities; i++){
    result.push(faker.name.firstName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
}
export const popuLateLastName = (numberOfCities) =>{
  faker.locale = "pl";
  const result = [];
  for(let i =0;i<numberOfCities; i++){
    result.push(faker.name.lastName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
}