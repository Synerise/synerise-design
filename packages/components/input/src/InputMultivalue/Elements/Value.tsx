import classnames from 'classnames';
import React from 'react';

import Icon, { CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../InputMultivalue.styles';
import type { ValueProps } from './Value.types';

const Value = ({
  disabled,
  key,
  onRemoveClick,
  value,
  focused,
  className,
  ...rest
}: ValueProps) => {
  const mergedClassName = classnames('ds-input-value-wrapper', className);
  return (
    <Tooltip offset="small" title={value}>
      <S.ValueWrapper
        data-testid="ds-input-value-wrapper"
        className={mergedClassName}
        disabled={disabled}
        key={key}
        {...rest}
      >
        <S.ValueText disabled={disabled}>{value}</S.ValueText>
        <S.IconWrapper onClick={onRemoveClick}>
          <Icon className="remove" component={<CloseS />} />
        </S.IconWrapper>
      </S.ValueWrapper>
    </Tooltip>
  );
};
export default Value;
