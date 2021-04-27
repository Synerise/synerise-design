import faker from 'faker';
import Badge from '@synerise/ds-badge';
import Avatar, { UserAvatar } from '@synerise/ds-avatar';
import * as React from 'react';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import { VarTypeListM, VarTypeNumberM } from '@synerise/ds-icon/dist/icons';

import { image } from '../Avatar/constants';

export const populateCities = numberOfCities => {
  const result = [];
  for (let i = 0; i < numberOfCities; i++) {
    result.push(faker.address.city());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
};
export const populateFirstName = numberOfCities => {
  faker.locale = 'en';
  const result = [];
  for (let i = 0; i < numberOfCities; i++) {
    result.push(faker.name.firstName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
};
export const popuLateLastName = numberOfCities => {
  faker.locale = 'en';
  const result = [];
  for (let i = 0; i < numberOfCities; i++) {
    result.push(faker.name.lastName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
};

const cities = populateCities(25).map(item => ({ text: item }));
const firstNames = populateFirstName(25).map(item => ({ text: item }));
const lastNames = popuLateLastName(25).map(item => ({ text: item }));

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

export const getItemsWithAvatar = numberOfItems => {
  const results = [];
  for (let i = 0; i < numberOfItems; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: image,
    };

    results.push({
      text: user.firstName + ' ' + user.lastName,
      filter: 'User Name',
      description: user.email,
      prefixel: (
        <UserAvatar badgeStatus="active" user={user} />
      ),
    });
  }
  return results;
};


export const parameters = [
  { text: 'First Name', icon: <VarTypeStringM /> },
  { text: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Sex', icon: <VarTypeStringM /> },
  { text: 'City', icon: <VarTypeStringM /> },
  { text: 'Transactions', icon: <VarTypeNumberM /> },
  { text: 'IP', icon: <VarTypeStringM /> },
  { text: 'Price', icon: <VarTypeListM /> },
  { text: 'Discount', icon: <VarTypeListM /> },
  { text: 'Products bought', icon: <VarTypeListM /> },
  { text: 'Loyalty points', icon: <VarTypeListM /> },
];

export const recent = [
  { text: 'Bangkok', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Frank', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Basel', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Chicago', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'London', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Brandon', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Male', filter: 'Sex', icon: <VarTypeStringM /> },
  { text: 'Brandon', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Rogers', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Richards', filter: 'Last Name', icon: <VarTypeStringM /> },
];