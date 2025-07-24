import React from 'react';

import {
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';

export const DEFAULT_ITEM_TYPE = 'text';
export const TYPES_WITH_ICONS = ['text', 'number', 'date', 'boolean', 'list'];
export const ICON_MAP: Record<(typeof TYPES_WITH_ICONS)[number], JSX.Element> =
  {
    text: <VarTypeStringM />,
    number: <VarTypeNumberM />,
    date: <VarTypeDateM />,
    boolean: <VarTypeBooleanM />,
    list: <VarTypeListM />,
  };
