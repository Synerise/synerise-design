import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './IconLabel.styles';
import { Props } from './IconLabel.types';


const IconLabelCell: React.FC<Props> = ({ label, icon }) => (
  <S.IconLabelCell>
    <Icon {...icon} />
    <span>{label}</span>
  </S.IconLabelCell>
);

export default IconLabelCell;
