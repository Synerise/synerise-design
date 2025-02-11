import React from 'react';
import { ExpressionM, FolderM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import type { FactorValueType, ParameterItem, ParameterValueType } from '@synerise/ds-factors';
import InformationCard from '@synerise/ds-information-card';

const generateInfoCard = (item: ParameterValueType) => {
  const randomCount = Math.floor(Math.random() * 100);
  return {
    ...item,
    renderHoverTooltip: () => (
      <InformationCard
        icon={item.icon}
        title={item.name}
        propertyListItems={[{ label: 'Some property', value: randomCount }]}
        descriptionConfig={item.description ? { label: item.description, disabled: true } : undefined}
        {...item.informationCardProps}
      />
    ),
  };
};

export const FACTORS_TEXTS = {
  datePicker: {
    apply: 'Apply',
    clearTooltip: 'Clear',
    inputPlaceholder: 'Select date',
    now: 'Now',
  },
  dynamicKey: {
    keyPlaceholder: 'Key',
    valuePlaceholder: 'Value',
  },
  formula: {
    buttonPlaceholder: 'Formula',
    defaultName: 'Formula',
  },
  parameter: {
    searchPlaceholder: 'Search',
    noResults: 'No results',
    loadingParameter: 'Loading parameters',
    showMore: 'Show more',
    recentItemsGroupName: 'Recent', 
    allItemsGroupName: 'All'
  },
  valuePlaceholder: 'Value',
  modalApply: 'Apply',
  modalCancel: 'Cancel',
  modalTitle: 'Value',
};

export const FACTORS_GROUPS = [
  {
    name: 'All',
    id: 0,
    allowEmpty: true,
    defaultGroup: true,
  },
  {
    name: 'Attributes',
    id: 1,
  },
  {
    name: 'Others',
    id: 2,
    subGroups: [
      {
        name: 'Specials',
        id: 3,
        icon: <FolderM />,
      },
      {
        name: 'Expressions',
        id: 4,
        icon: <FolderM />,
      },
      {
        name: 'Aggregates',
        id: 5,
        icon: <FolderM />,
      },
    ],
  },
];

export const FACTORS_ITEMS_DATA: ParameterItem[] = [
  {
    id: 0,
    name: 'First name',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 1,
    name: 'Last name',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 2,
    name: 'City',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 3,
    name: 'Loyality score',
    groupId: 1,
    icon: <ExpressionM />,
  },
  {
    id: 4,
    name: 'Points',
    groupId: 1,
    icon: <VarTypeNumberM />,
  },
  {
    id: 110,
    name: 'TIMESTAMP',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 4,
    name: 'Attribute #1',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 5,
    name: 'Attribute #2',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 6,
    name: 'Attribute #3',
    groupId: 1,
    icon: <VarTypeStringM />,
  },
  {
    id: 7,
    name: 'Attribute #4',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
];

export const FACTORS_ITEMS_ADDITONAL_DATA = [

  {
    id: 8,
    name: 'Expression #1',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 9,
    name: 'Expression #2',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 10,
    name: 'Expression #3',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 11,
    name: 'Expression #4',
    groupId: 4,
    icon: <VarTypeStringM />,
  },
  {
    id: 12,
    name: 'Aggregate #1',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
  {
    id: 13,
    name: 'Aggregate #2',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
  {
    id: 14,
    name: 'Aggregate #3',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
  {
    id: 15,
    name: 'Aggregate #4',
    groupId: 5,
    icon: <VarTypeStringM />,
  },
].map(generateInfoCard);

export const FACTORS_ITEMS: ParameterItem[] = [...FACTORS_ITEMS_DATA].map(generateInfoCard);

export const SELECTED_PARAMETER: FactorValueType = {
  ...FACTORS_ITEMS[0],
  icon: <VarTypeStringM />,
  type: '',
};
