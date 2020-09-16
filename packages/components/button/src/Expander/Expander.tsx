import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from './Expander.styles';

export enum ExpanderSize {
  'S' = 24,
  'M' = 32,
}

export interface ExpanderProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: 'S' | 'M';
  disabled?: boolean;
  expanded?: boolean;
}

const Expander: React.FC<ExpanderProps> = ({ size = 'S', expanded, disabled, onClick }) => {
  return (
    <S.Expander
      onClick={onClick}
      size={ExpanderSize[size]}
      className="ds-expander"
      expanded={expanded}
      disabled={disabled}
    >
      <Icon component={<AngleDownS />} />
    </S.Expander>
  );
};
export default Expander;
