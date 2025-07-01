import classnames from 'classnames';
import React, { useState } from 'react';

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
  const [hovered, setHovered] = useState(false);
  const mergedClassName = classnames('ds-input-value-wrapper', className);
  return (
    <S.ValueWrapper
      data-testid="ds-input-value-wrapper"
      className={mergedClassName}
      onMouseOver={() => {
        focused && setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      disabled={disabled}
      key={key}
      shrink={hovered}
      {...rest}
    >
      <Tooltip
        align={{ offset: [8, 0] }}
        offset="small"
        title={value}
        visible={focused && hovered}
      >
        <S.ValueText shrink={hovered} disabled={disabled}>
          {value}
        </S.ValueText>
      </Tooltip>
      <S.IconWrapper onClick={onRemoveClick}>
        <Icon className="remove" component={<CloseS />} />
      </S.IconWrapper>
    </S.ValueWrapper>
  );
};
export default Value;
