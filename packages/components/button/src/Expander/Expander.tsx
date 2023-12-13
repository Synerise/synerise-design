import React from 'react';
import classnames from 'classnames';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import * as S from './Expander.styles';
import { ExpanderProps, ExpanderSize } from './Expander.types';

const Expander = ({ size = 'S', expanded, disabled, onClick, className }: ExpanderProps) => {
  return (
    <S.Expander
      onClick={onClick}
      size={ExpanderSize[size]}
      className={classnames([className, 'ds-expander'])}
      expanded={expanded}
      disabled={disabled}
    >
      <Icon component={<AngleDownS />} />
    </S.Expander>
  );
};
export default Expander;
