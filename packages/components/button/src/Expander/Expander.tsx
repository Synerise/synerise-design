import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from './Expander.styles';
import { ExpanderProps, ExpanderSize } from './Expander.types';

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
