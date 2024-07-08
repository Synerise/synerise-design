import { faker } from '@faker-js/faker';
import { CardTabsItem } from '@synerise/ds-card-tabs';

export const createItemData = (index: number) => ({
  name: `Variant ${index + 1}`,
  tag: String.fromCharCode(65 + index).toUpperCase(),
  id: faker.number.int(),
});

export const CARD_TABS_ITEMS: CardTabsItem[] = Array.from(Array(4)).map((_i, index) => createItemData(index));
