import React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './IconLabel.styles';
import { IconLabelProps } from './IconLabel.types';

const IconLabelCell = ({ label, icon, ...htmlAttributes }: IconLabelProps) => (
  <S.IconLabelCell {...htmlAttributes}>
    <Icon {...icon} />
    <span>{label}</span>
  </S.IconLabelCell>
);

export default IconLabelCell;
