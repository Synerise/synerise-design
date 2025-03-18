import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import Icon, { AddM } from '@synerise/ds-icon';

import * as S from './Creator.styles';
import { CreatorProps } from './Creator.types';

const Creator = ({ onClick, disabled, label, block, status, className, ...htmlAttributes }: CreatorProps) => {
  const [pressed, setPressed] = useState(false);
  const onPress = useCallback(() => {
    setPressed(true);
  }, []);
  const onRelease = useCallback(() => {
    setPressed(false);
  }, []);
  return (
    <S.Creator
      block={block}
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
        {label && <S.CreatorLabel data-testid="ds-add-button-label">{label}</S.CreatorLabel>}
      </>
    </S.Creator>
  );
};
export default Creator;
