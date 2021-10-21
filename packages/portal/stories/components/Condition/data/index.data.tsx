import { ExpressionM, FolderM, NotificationsM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import * as React from 'react';
import { v4 as uuid } from 'uuid';

export const SUBJECT_ITEMS = [...new Array(30)].map((i, index) => ({
  id: index,
  name: `Attribute #${index}`,
  icon: <NotificationsM />,
}));

export const PARAMETER_GROUPS = [
  {
    name: 'Recent',
    id: 1,
    defaultGroup: true,
  },
  {
    name: 'All',
    id: 2,
    subGroups: [
      {
        name: 'Attributes',
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
        id: 3,
        icon: <FolderM />,
      },
    ],
  },
];

export const PARAMETER_ITEMS = [
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
];

export const DEFAULT_CONDITION_ROW = () => ({
  id: uuid(),
  parameter: {
    value: '',
  },
  operator: {
    value: undefined,
  },
  factor: {
    selectedFactorType: '',
    defaultFactorType: 'text',
    value: '',
  },
});

export const DEFAULT_STEP = (subject = undefined) => ({
  id: uuid(),
  stepName: '',
  subject: {
    onShowPreview: undefined,
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    selectedItem: subject,
    items: SUBJECT_ITEMS,
  },
  conditions: [],
});

export const DEFAULT_STATE = {
  selected: undefined,
  selectedFactorType: undefined,
  factorValue: undefined,
  steps: [DEFAULT_STEP()],
};
