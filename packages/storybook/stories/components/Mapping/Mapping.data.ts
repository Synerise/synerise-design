import { faker } from '@faker-js/faker';

export type ItemType = typeof DATA_SOURCE[number];
export const DATA_SOURCE = [...new Array(20)].map((_item, index) => {
  const name = faker.database.column();
  return {
    id: faker.string.uuid(),
    parameterName: name,
    mapped: faker.datatype.boolean(),
    mappingName: name,
  };
});

export const CATALOG_ITEM_KEY = {
    name: 'Shop ID',
    id: faker.string.uuid()
}
export type EventParameterType = typeof EVENT_PARAMETERS[number]
export const EVENT_PARAMETERS = [...new Array(20)].map((_item, index) => {
  return {
    id: faker.string.uuid(),
    parameterName: faker.database.column()
  };
});
