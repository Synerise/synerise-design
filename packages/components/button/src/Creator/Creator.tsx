import classnames from 'classnames';
import React, { forwardRef, useCallback, useState } from 'react';

import Icon, { AddM } from '@synerise/ds-icon';

import * as S from './Creator.styles';
import { type CreatorProps } from './Creator.types';

const Creator = forwardRef<HTMLButtonElement, CreatorProps>(
  (
    {
      onClick,
      disabled,
      label,
      block,
      status,
      className,
      labelAlign = 'center',
      ...htmlAttributes
    },
    ref,
  ) => {
    const [pressed, setPressed] = useState(false);
    const onPress = useCallback(() => {
      setPressed(true);
    }, []);
    const onRelease = useCallback(() => {
      setPressed(false);
    }, []);
    return (
      <S.Creator
        ref={ref}
        block={block}
        labelAlign={labelAlign}
        className={classnames([className, 'ds-button-creator'])}
        disabled={disabled}
        onClick={onClick}
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        withLabel={Boolean(label)}
        pressed={pressed}
        status={status}
        {...htmlAttributes}
      >
        <>
          <Icon component={<AddM />} />
          {label && (
            <S.CreatorLabel data-testid="ds-add-button-label">
              {label}
            </S.CreatorLabel>
          )}
        </>
      </S.Creator>
    );
  },
);
export default Creator;
