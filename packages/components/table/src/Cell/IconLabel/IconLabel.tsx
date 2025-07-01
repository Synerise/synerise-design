import React from 'react';

import Icon from '@synerise/ds-icon';

import * as S from './IconLabel.styles';
import { type IconLabelProps } from './IconLabel.types';

const IconLabelCell = ({
  label,
  icon,
  disabled,
  ...htmlAttributes
}: IconLabelProps) => (
  <S.IconLabelCell isDisabled={disabled} {...htmlAttributes}>
    {icon && <Icon {...icon} />}
    {label && <span>{label}</span>}
  </S.IconLabelCell>
);

export default IconLabelCell;
