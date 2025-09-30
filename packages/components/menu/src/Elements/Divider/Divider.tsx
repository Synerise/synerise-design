import React from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

import { type MenuDividerProps } from '../../Menu.types';
import * as S from './Divider.styles';

export const Divider = (
  props: WithHTMLAttributes<HTMLDivElement, MenuDividerProps>,
) => {
  return <S.MenuDivider dashed {...props} />;
};
