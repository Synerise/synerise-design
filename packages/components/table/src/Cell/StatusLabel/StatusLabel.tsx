import * as React from 'react';
import Badge from '@synerise/ds-badge';
import * as S from './StatusLabel.styles';
import { Props } from './StatusLabel.types';

const StatusLabelCell: React.FC<Props> = ({ status, label }: Props) => {
  return (
    <S.StatusLabel>
      <Badge status={status} />
      <S.Label>{label}</S.Label>
    </S.StatusLabel>
  );
};

export default StatusLabelCell;
