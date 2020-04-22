import faker from 'faker';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import * as React from 'react';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
const IMG_SRC = 'https://www.w3schools.com/howto/img_avatar.png';

export const populateCities = (numberOfCities) =>{
  const result = [];
  for(let i =0;i<numberOfCities; i++){
    result.push(faker.address.city());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
}
export const populateFirstName = (numberOfCities) =>{
  faker.locale = "en";
  const result = [];
  for(let i =0;i<numberOfCities; i++){
    result.push(faker.name.firstName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
}
export const popuLateLastName = (numberOfCities) =>{
  faker.locale = "en";
  const result = [];
  for(let i =0;i<numberOfCities; i++){
    result.push(faker.name.lastName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
}

const cities = populateCities(50).map(item => ({ text: item }));
const firstNames = populateFirstName(50).map(item => ({ text: item }));
const lastNames = popuLateLastName(50).map(item => ({ text: item }));

export const getSuggestions = filter => {
  if (filter === 'City') {
    return cities;
  }
  if (filter === 'First Name') {
    return firstNames;
  }
  if (filter === 'Last Name') {
    return lastNames;
  }
  if (filter === 'Sex') {
    return [{ text: 'Female' }, { text: 'Male' }];
  } else return [{ text: 'Some suggestions' }, { text: 'not matched' }, { text: 'by filter type' }, { text: 'yet' }];
};

export const getItemsWithAvatar = (numberOfItems) =>{
  const results = [];
  for(let i =0;i<numberOfItems; i++){
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    results.push({
      text: firstName + ' ' + lastName,
      filter:"User Name",
      description: email,
      icon: <VarTypeStringM />,
      prefixel: (
      <Badge status="active">
      <Avatar size="medium" src={IMG_SRC} shape="circle">
      {firstName[0] + lastName[0]}
      </Avatar>
      </Badge>
      )
    });
  }
  return results;
}
