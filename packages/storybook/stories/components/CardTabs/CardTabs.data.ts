import { faker } from '@faker-js/faker';
import { CardTabProps, prefixType } from '@synerise/ds-card-tabs';

export const createItemData = (index: number): CardTabProps<string> => ({
  name: `Variant ${index + 1}`,
  tag: String.fromCharCode(65 + index).toUpperCase(),
  prefix: prefixType.TAG,
  id: faker.string.uuid()
});

export const CARD_TABS_ITEMS = Array.from(Array(4)).map((_i, index) => createItemData(index));
