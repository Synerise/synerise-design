import React from 'react';
import { action } from 'storybook/actions';
import { v4 as uuid } from 'uuid';

import { faker } from '@faker-js/faker';
import Icon, {
  Add3M,
  AddM,
  FileM,
  FolderM,
  FunnelM,
  SearchM,
  SegmentM,
  UserM,
} from '@synerise/ds-icon';
import InformationCard, {
  InformationCardProps,
} from '@synerise/ds-information-card';
import type { Action, ItemLoaderConfig } from '@synerise/ds-item-picker';

import type {
  AttributeType,
  FolderType,
  FunnelType,
  ItemType,
  NestedSectionType,
  SectionType,
  SegmentationType,
} from './ItemPicker.types';

export const ICONS = {
  none: null,
  user: <Icon component={<UserM />} />,
  add: <Icon component={<Add3M />} />,
  file: <Icon component={<FileM />} />,
  segment: <Icon component={<SegmentM />} />,
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
const STATIC_ITEMS = [
  {
    text: 'Item 1 Russell Windler DDS',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 2 Michael Leannon',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 3 Bert McClure',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 4 Benny Roberts',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 5 Dr. Lucas Gutkowski DVM',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 6 Casey Hammes',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 7 Alexander Spencer',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 8 Kristopher Cormier',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 9 Lance Walker',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 10 Lorraine Cole',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 11 Maxine Weissnat',
    prefixel: <Icon component={<UserM />} />,
  },
  {
    text: 'Item 12 Dallas Goyette',
    prefixel: <Icon component={<UserM />} />,
  },
];

export const FLAT_DATA_SOURCE: ItemType[] = STATIC_ITEMS.concat(
  [...new Array(500)].map((i, k) => ({
    text: `Item ${k + 1 + STATIC_ITEMS.length} ${faker.person.fullName()}`,
    prefixel: <Icon component={<UserM />} />,
  })),
);

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
const attributeItem = (
  index: number,
  itemNameSuffix: string,
  sectionId: string,
): AttributeType => {
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

const folderItem = (index: number): FolderType => {
  const itemData = {
    key: uuid(),
    itemType: 'folder' as const,
    text: `Folder with a very long name that will get clipped with ellipsis ${index + 1}`,
    sectionId: 'FOLDERS',
    prefixel: <Icon component={<FolderM />} />,
    author: faker.person.fullName(),
  };
  return itemData;
};

const SEGMENTATIONS = Array.from({ length: 300 }).map((_val, index) =>
  segmentationItem(index),
);
const ATTRIBUTES_CONFIGURABLE = Array.from({ length: 300 }).map((_val, index) =>
  attributeItem(index, 'configurable', 'ATTRIBUTES-CONFIGURABLE'),
);
const ATTRIBUTES_READY_TO_USE = Array.from({ length: 300 }).map((_val, index) =>
  attributeItem(index, 'ready to use', 'ATTRIBUTES-READY-TO-USE'),
);
const FUNNELS = Array.from({ length: 300 }).map((_val, index) =>
  funnelItem(index),
);
const FOLDERS = Array.from({ length: 300 }).map((_val, index) =>
  folderItem(index),
);

export const ITEMS_IN_SECTIONS: ItemType[] = [
  ...SEGMENTATIONS.slice(0, 13),
  ...FUNNELS.slice(0, 22),
];
export const ITEMS_IN_SECTIONS_NESTED: ItemType[] = [
  ...SEGMENTATIONS.slice(0, 12),
  ...FUNNELS.slice(0, 22),
  ...ATTRIBUTES_CONFIGURABLE.slice(0, 32),
  ...ATTRIBUTES_READY_TO_USE.slice(0, 28),
];
export const ITEMS_IN_SECTIONS_SHORT: ItemType[] = [
  ...SEGMENTATIONS.slice(5, 8),
  ...FUNNELS.slice(2, 6),
];
export const RECENT: ItemType[] = [
  SEGMENTATIONS[4],
  FUNNELS[6],
  SEGMENTATIONS[11],
];

export const ACTIONS: Action[] = [
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
  {
    actionType: 'searchBy',
    id: 'search-by-parameter',
    text: 'Search by parameter',
    prefixel: <Icon component={<SearchM />} />,
    searchParams: [
      {
        paramListLabel: 'Name',
        paramKeyLabel: 'Name:',
        paramKey: 'name',
        icon: <UserM />,
      },
      {
        paramListLabel: 'Author',
        paramKeyLabel: 'Author:',
        paramKey: 'author',
        icon: <UserM />,
      },
    ],
  },
  {
    actionType: 'searchIn',
    id: 'searchInGlobal',
    text: 'Search in folders',
    loadItemsSectionId: 'FOLDERS',
    renderSearchInValueText: (item) => `Search in ${item.text}`,
    prefixel: <Icon component={<SearchM />} />,
  },
  {
    actionType: 'searchIn',
    id: 'searchInSegmentations',
    text: 'Search in folders (second)',
    loadItemsSectionId: 'FOLDERS',
    searchInSectionId: 'TEST',
    sectionId: 'SEGMENTATIONS',
    renderSearchInValueText: (item) => `Search in ${item.text}`,
    prefixel: <Icon component={<SearchM />} />,
  },
  {
    actionType: 'searchIn',
    id: 'searchInFunnels',
    text: 'Search in folders (second)',
    sectionId: 'FUNNELS',
    renderSearchInValueText: (item) => `Search in ${item.text}`,
  },
  {
    actionType: 'searchBy',
    id: 'search-by-parameter',
    sectionId: 'SEGMENTATIONS',
    text: 'Search by parameter',
    prefixel: <Icon component={<SearchM />} />,
    searchParams: [
      {
        paramListLabel: 'Profile',
        paramKeyLabel: 'Profile:',
        paramKey: 'profile',
        icon: <UserM />,
      },
    ],
  },
  {
    actionType: 'searchBy',
    id: 'search-by-parameter',
    text: 'Search by parameter',
    sectionId: 'FUNNELS',
    prefixel: <Icon component={<SearchM />} />,
    searchParams: [
      {
        paramListLabel: 'Profile',
        paramKeyLabel: 'Profile:',
        paramKey: 'profile',
        icon: <UserM />,
      },
    ],
  },
];

const loadItems = (props: {
  page: number;
  limit: number;
  searchQuery?: string;
  sectionId?: string | number;
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
    case 'FOLDERS':
      source = FOLDERS;
      break;
    case 'TEST':
      source = [];
      break;
  }

  const filteredItems = searchQuery
    ? source.filter(
        (item) =>
          item.text &&
          String(item.text).toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : source;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        items: [...filteredItems.slice(page * limit, page * limit + limit)],
        total: source.length,
      });
    }, 800);
  });
};

const loadItemsWithError = (props: {
  page: number;
  limit: number;
  searchQuery?: string;
  sectionId?: string | number;
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
    ? source.filter(
        (item) =>
          item.text &&
          String(item.text).toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : source;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (faker.number.int(10)! % 3) {
        resolve({
          items: [...filteredItems.slice(page * limit, page * limit + limit)],
          total: source.length,
        });
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
