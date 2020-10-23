import { InfoFillS, VarTypeListM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';

export const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 254,
    fixed: 'left',
    key: 'name',
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
    sorter: (a, b) => {
      return a.name - b.name ? -1 : 1;
    }
  },
  {
    title: 'City',
    dataIndex: 'city',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'city',
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
    sorter: (a, b) => {
      return a.city - b.city ? -1 : 1;
    }
  },
  {
    title: 'System',
    dataIndex: 'system',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'system',
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
  },
  {
    title: 'Format',
    dataIndex: 'format',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'format',
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    fixed: 'right',
    key: 'age',
    icon: { component: <VarTypeNumberM/>},
    iconTooltip: { component: <InfoFillS/>},
    sorter: (a, b) => {
      return a.age - b.age ? -1 : 1;
    }
  },
];
