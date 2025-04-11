import React, { ReactText } from 'react';
import { v4 as uuid } from 'uuid';
import { action } from '@storybook/addon-actions';
import { faker } from '@faker-js/faker';

import Icon, { Add3M, AddM, FileM, FunnelM, SegmentM, UserM } from '@synerise/ds-icon';

import type { ItemLoaderConfig } from '@synerise/ds-item-picker';
import InformationCard, { InformationCardProps } from '@synerise/ds-information-card';

import type {
  SectionType,
  NestedSectionType,
  ItemType,
  FunnelType,
  SegmentationType,
  AttributeType,
} from './ItemPicker.types';
import { ActionType } from '@synerise/ds-item-picker/dist/components/ItemPickerNew/ItemPickerNew.types';

export const ICONS = {
  none: null,
  user: <Icon component={<UserM />} />,
  add: <Icon component={<Add3M />} />,
  file: <Icon component={<FileM />} />,
};

const isSegmentationType = (item: ItemType): item is SegmentationType => {
  return item.itemType === 'segmentation';
};
const isFunnelType = (item: ItemType): item is FunnelType => {
  return item.itemType === 'funnel';
};
const isAttributeType = (item: ItemType): item is AttributeType => {
  return item.itemType === 'attribute';
};

const getInformationCardProps = (item: ItemType) => {
  const baseProps: InformationCardProps = {
    title: item.text,
  };

  if (isFunnelType(item) || isSegmentationType(item) || isAttributeType(item)) {
    const propertyListItems = [
      {
        label: 'Created',
        value: item.createdDate,
      },
      {
        label: 'Updated',
        value: item.updatedDate,
      },
      {
        label: 'Author',
        value: item.author,
      },
      {
        label: 'Used in',
        value: `${item.usedIn} analysis`,
      },
    ];

    if (isSegmentationType(item)) {
      return {
        ...baseProps,
        propertyListItems: [
          {
            label: 'Value',
            value: `${item.value}`,
          },
          {
            label: null,
            type: 'divider',
          },
          ...propertyListItems,
        ],
      };
    }
    return {
      ...baseProps,
      propertyListItems: propertyListItems,
    };
  }
  return {
    ...baseProps,
  };
};
const infocardGenerator = (item: ItemType) => {
  const props = getInformationCardProps(item);
  return () => <InformationCard {...props} />;
};
export const FLAT_DATA_SOURCE: ItemType[] = [...new Array(500)].map((i, k) => ({
  text: `Item ${k + 1} ${faker.person.fullName()}`,
  prefixel: <Icon component={<UserM />} />,
}));

const segmentationItem = (index: number): SegmentationType => {
  const itemData = {
    key: uuid(),
    itemType: 'segmentation' as const,
    text: `Segmentation ${index + 1}`,
    sectionId: 'SEGMENTATIONS',
    prefixel: <Icon component={<SegmentM />} />,
    author: faker.person.fullName(),
    createdDate: faker.date.recent({ days: 30 }).toLocaleDateString(),
    updatedDate: faker.date.recent({ days: 3 }).toLocaleDateString(),
    usedIn: faker.number.int(50),
    value: faker.number.int(5000),
  };
  return {
    ...itemData,
    renderHoverTooltip: infocardGenerator(itemData),
  };
};
const attributeItem = (index: number, itemNameSuffix: string,  sectionId: string): AttributeType => {
  const itemData = {
    key: uuid(),
    itemType: 'attribute' as const,
    text: `Attribute ${itemNameSuffix} ${index + 1}`,
    sectionId,
    prefixel: <Icon component={<SegmentM />} />,
    author: faker.person.fullName(),
    createdDate: faker.date.recent({ days: 30 }).toLocaleDateString(),
    updatedDate: faker.date.recent({ days: 3 }).toLocaleDateString(),
    usedIn: faker.number.int(50),
    value: faker.number.int(5000),
  };
  return {
    ...itemData,
    renderHoverTooltip: infocardGenerator(itemData),
  };
};

const funnelItem = (index: number): FunnelType => {
  const itemData = {
    key: uuid(),
    itemType: 'funnel' as const,
    text: `Funnel ${index + 1}`,
    sectionId: 'FUNNELS',
    prefixel: <Icon component={<FunnelM />} />,
    author: faker.person.fullName(),
    createdDate: faker.date.recent({ days: 30 }).toLocaleDateString(),
    updatedDate: faker.date.recent({ days: 3 }).toLocaleDateString(),
    usedIn: faker.number.int(50),
  };
  return {
    ...itemData,
    informationCardProps: getInformationCardProps(itemData),
  };
};
const SEGMENTATIONS = Array.from({ length: 300 }).map((_val, index) => segmentationItem(index));
const ATTRIBUTES_CONFIGURABLE = Array.from({ length: 300 }).map((_val, index) =>
  attributeItem(index, 'configurable', 'ATTRIBUTES-CONFIGURABLE')
);
const ATTRIBUTES_READY_TO_USE = Array.from({ length: 300 }).map((_val, index) =>
  attributeItem(index, 'ready to use', 'ATTRIBUTES-READY-TO-USE')
);
const FUNNELS = Array.from({ length: 300 }).map((_val, index) => funnelItem(index));
export const ITEMS_IN_SECTIONS: ItemType[] = [...SEGMENTATIONS.slice(0, 13), ...FUNNELS.slice(0, 22)];
export const ITEMS_IN_SECTIONS_NESTED: ItemType[] = [...SEGMENTATIONS.slice(0, 12), ...FUNNELS.slice(0, 22), ...ATTRIBUTES_CONFIGURABLE.slice(0,32), ...ATTRIBUTES_READY_TO_USE.slice(0,28)];
export const ITEMS_IN_SECTIONS_SHORT: ItemType[] = [...SEGMENTATIONS.slice(5, 8), ...FUNNELS.slice(2, 6)];
export const RECENT: ItemType[] = [SEGMENTATIONS[4], SEGMENTATIONS[1], FUNNELS[3], FUNNELS[6], SEGMENTATIONS[11]];

export const ACTIONS: ActionType[] = [
  {
    text: `Add funnel`,
    actionType: 'custom',
    id: '1',
    sectionId: 'FUNNELS',
    prefixel: <Icon component={<AddM />} />,
    onClick: action('Action clicked'),
  },
  {
    text: `Create page`,
    actionType: 'custom',
    id: '1',
    prefixel: <Icon component={<AddM />} />,
    onClick: action('Action clicked'),
  },
];

const loadItems = (props: {
  page: number;
  limit: number;
  searchQuery?: string;
  sectionId?: ReactText;
}): Promise<{ items: ItemType[]; total: number }> => {
  const { page, limit, sectionId, searchQuery } = props;

  let source = FLAT_DATA_SOURCE;
  switch (sectionId) {
    case 'SEGMENTATIONS':
      source = SEGMENTATIONS;
      break;
    case 'ATTRIBUTES-READY-TO-USE':
      source = ATTRIBUTES_READY_TO_USE;
      break;
    case 'ATTRIBUTES-CONFIGURABLE':
      source = ATTRIBUTES_CONFIGURABLE;
      break;
    case 'FUNNELS':
      source = FUNNELS;
      break;
  }

  const filteredItems = searchQuery
    ? source.filter(item => item.text && String(item.text).toLowerCase().includes(searchQuery.toLowerCase()))
    : source;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ items: [...filteredItems.slice(page * limit, page * limit + limit)], total: source.length });
    }, 800);
  });
};

const loadItemsWithError = (props: {
  page: number;
  limit: number;
  searchQuery?: string;
  sectionId?: ReactText;
}): Promise<{ items: ItemType[]; total: number }> => {
  const { page, limit, sectionId, searchQuery } = props;
  let source = FLAT_DATA_SOURCE;
  switch (sectionId) {
    case 'SEGMENTATIONS':
      source = SEGMENTATIONS;
      break;
    case 'ATTRIBUTES-READY-TO-USE':
      source = ATTRIBUTES_READY_TO_USE;
      break;
    case 'ATTRIBUTES-CONFIGURABLE':
      source = ATTRIBUTES_CONFIGURABLE;
      break;
    case 'FUNNELS':
      source = FUNNELS;
      break;
  }

  const filteredItems = searchQuery
    ? source.filter(item => item.text && String(item.text).toLowerCase().includes(searchQuery.toLowerCase()))
    : source;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (faker.number.int(10)! % 3) {
        resolve({ items: [...filteredItems.slice(page * limit, page * limit + limit)], total: source.length });
        return;
      }
      reject('random error');
    }, 500);
  });
};

export const ITEM_LOADER_CONFIG: ItemLoaderConfig<ItemType> = {
  limitPerPage: 50,
  limitPerSection: 4,
  loadItems,
};

export const ITEM_LOADER_CONFIG_ERRORS: ItemLoaderConfig<ItemType> = {
  limitPerPage: 50,
  limitPerSection: 4,
  loadItems: loadItemsWithError,
};

export const SECTIONS_WITH_FOLDERS: SectionType[] = [
  {
    id: 'ANALYTICS',
    text: 'Analytics',
    folders: [
      {
        id: 'SEGMENTATIONS',
        text: 'Segmentations',
      },
      {
        id: 'FUNNELS',
        text: 'Funnels',
      },
    ],
  },
];

export const SECTIONS_WITH_NESTED_FOLDERS: NestedSectionType[] = [
  {
    id: 'ANALYTICS',
    text: 'Analytics',
    folders: [
      {
        id: 'ATTRIBUTES',
        text: 'Attributes',
        folders: [
          {
            id: 'ATTRIBUTES-READY-TO-USE',
            text: 'Ready to use',
          },
          {
            id: 'ATTRIBUTES-CONFIGURABLE',
            text: 'Configurable',
          },
        ],
      },
      {
        id: 'FUNNELS',
        text: 'Funnels',
      },
    ],
  },
];

export const SECTIONS = [
  {
    id: 'SEGMENTATIONS',
    text: 'Segmentations',
  },
  {
    id: 'FUNNELS',
    text: 'Funnels',
  },
];
