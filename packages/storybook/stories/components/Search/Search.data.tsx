import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { faker } from '@faker-js/faker';
import { UserAvatar } from '@synerise/ds-avatar';
import {
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import { AnyObject } from '@synerise/ds-search/dist/Search.types';

import { avatar1 } from '../../constants';

export const populateCities = (numberOfCities) => {
  const result: string[] = [];
  for (let i = 0; i < numberOfCities; i++) {
    result.push(faker.location.city());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
};
export const populateFirstName = (numberOfCities) => {
  const result: string[] = [];
  for (let i = 0; i < numberOfCities; i++) {
    result.push(faker.name.firstName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
};
export const popuLateLastName = (numberOfCities) => {
  const result: string[] = [];
  for (let i = 0; i < numberOfCities; i++) {
    result.push(faker.name.lastName());
  }
  result.sort((a, b) => a.localeCompare(b));
  return result;
};

const cities = populateCities(25).map((item) => ({ text: item }));
const firstNames = populateFirstName(25).map((item) => ({ text: item }));
const lastNames = popuLateLastName(25).map((item) => ({ text: item }));

export const getSuggestions = (filter) => {
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
  } else
    return [
      { text: 'Some suggestions' },
      { text: 'not matched' },
      { text: 'by filter type' },
      { text: 'yet' },
    ];
};

export const getItemsWithAvatar = (numberOfItems) => {
  const results: Array<{
    text: string;
    filter: string;
    description: string;
    prefixel: ReactNode;
  }> = [];
  for (let i = 0; i < numberOfItems; i++) {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: avatar1,
    };

    results.push({
      text: user.firstName + ' ' + user.lastName,
      filter: 'User Name',
      description: user.email,
      prefixel: <UserAvatar badgeStatus="active" user={user} />,
    });
  }
  return results;
};

export type ParameterType = AnyObject;

export type ItemType = AnyObject;

export const parameters: ParameterType[] = [
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

export const recent: ItemType[] = [
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

export const RECENT_TITLE = 'Recent';
export const RECENT_TOOLTIP = 'Recent tooltip';
export const RECENT_COUNT = 3;

export const PARAMETERS_TITLE = 'Search in';
export const PARAMETERS_TOOLTIP = 'Search in tooltip';
export const PARAMETERS_COUNT = 6;

export const SUGGESTIONS_TITLE = 'Suggestions';
export const SUGGESTIONS_TOOLTIP = 'Suggestions tooltip';

const SearchWrapper = styled.div`
  display: 'flex';
  justify-content: flex-end;
  width: 300px;
`;
export const SearchDecorator = (Story) => (
  <SearchWrapper>{Story()}</SearchWrapper>
);
