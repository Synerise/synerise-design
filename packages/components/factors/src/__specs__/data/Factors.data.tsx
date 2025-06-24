import React from 'react';
import { ExpressionM, FolderM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';

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
    buttonPlaceholder: 'Define formula',
    defaultName: 'Formula'
  },
  parameter: {
    searchPlaceholder: 'Search',
    noResults: 'No results',
  },
  valuePlaceholder: 'Value',
  modalApply: 'Apply',
  modalCancel: 'Cancel',
  modalTitle: 'Value',
  relativeDate: {
    triggerPlaceholder: 'Select date'
  },
  array: {
    rawButtonLabel: 'Raw'
  }
}

export const FACTORS_GROUPS = [
  {
    name: 'Recent',
    id: 1,
    allowEmpty: true,
    defaultGroup: true,
  }, {
    name: 'All',
    id: 2,
    subGroups: [{
      name: 'Attributes',
      id: 3,
      icon: <FolderM />
    },
    {
      name: 'Expressions',
      id: 4,
      icon: <FolderM />
    },
    {
      name: 'Aggregates',
      id: 3,
      icon: <FolderM />
    },
    ]
  }
];

export const FACTORS_ITEMS = [
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
    name: 'First name',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 4,
    name: 'Attribute #1',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 5,
    name: 'Attribute #2',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 6,
    name: 'Attribute #3',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
  {
    id: 7,
    name: 'Attribute #4',
    groupId: 3,
    icon: <VarTypeStringM />,
  },
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
]
