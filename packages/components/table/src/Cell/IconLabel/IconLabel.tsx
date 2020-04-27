import * as React from 'react';
import { IconProps } from '@synerise/ds-icon/dist/Icon';
import Icon from '@synerise/ds-icon';
import * as S from './IconLabel.styes';

interface Props {
  label: string;
  icon: IconProps;
}

const IconLabelCell: React.FC<Props> = ({ label, icon }) => (
  <S.IconLabelCell>
    <Icon {...icon} />
    <span>{label}</span>
  </S.IconLabelCell>
);

export default IconLabelCell;
