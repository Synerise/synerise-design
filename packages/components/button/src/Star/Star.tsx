import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { StarM, StarFillM } from '@synerise/ds-icon';
import Button from '../Button';
import * as S from './Star.styles';
import { StarButtonProps } from './Star.types';

const StarButton = (props: StarButtonProps): React.ReactElement => {
  const { hasError, active, ...restProps } = props;

  return (
    <Button
      aria-pressed={!!active}
      mode="single-icon"
      role="button"
      style={{ transition: 'none' }}
      tabIndex={0}
      type="ghost"
      {...restProps}
    >
      <S.IconWrapper active={active} error={hasError}>
        <Icon component={active ? <StarFillM /> : <StarM />} />
      </S.IconWrapper>
    </Button>
  );
};

export default StarButton;
