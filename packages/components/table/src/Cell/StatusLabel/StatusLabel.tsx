import * as React from 'react';
import Badge from '@synerise/ds-badge';
import { Status } from '@synerise/ds-badge/dist/Badge';
import * as S from './StatusLabel.styles';

type Props = {
  status: Status;
  label: string | React.ReactNode;
};

const StatusLabelCell: React.FC<Props> = ({ status, label }: Props) => {
  return (
    <S.StatusLabel>
      <Badge status={status} />
      <S.Label>{label}</S.Label>
    </S.StatusLabel>
  );
};

export default StatusLabelCell;
