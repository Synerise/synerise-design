import React from 'react';
import classnames from 'classnames';
import Icon, { AddM } from '@synerise/ds-icon';

import * as S from './Creator.styles';
import { CreatorProps } from './Creator.types';

const Creator = ({ onClick, disabled, label, block, status, className }: CreatorProps) => {
  const [pressed, setPressed] = React.useState(false);
  const onPress = React.useCallback((): void => {
    setPressed(true);
  }, []);
  const onRelease = React.useCallback((): void => {
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
    >
      <>
        <Icon component={<AddM />} />
        {label && <S.CreatorLabel data-testid="ds-add-button-label">{label}</S.CreatorLabel>}
      </>
    </S.Creator>
  );
};
export default Creator;
