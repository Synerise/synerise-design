import React from 'react';

import Icon, {
  CheckboxIndeterminateM,
  CheckboxSelectedFillM,
} from '@synerise/ds-icon';

import Button from '../Button';
import * as S from './Checkbox.styles';
import {
  type ButtonCheckboxIconProps,
  type CheckboxButtonProps,
} from './Checkbox.types';

const CheckboxButtonIcon = ({
  checked,
  indeterminate,
}: ButtonCheckboxIconProps): React.ReactElement => {
  if (indeterminate) {
    return <CheckboxIndeterminateM />;
  }

  if (checked) {
    return <CheckboxSelectedFillM />;
  }

  return (
    <>
      <S.DefaultIcon />
      <S.HoverIcon />
    </>
  );
};

const getNextCheckedState = (
  prevState: boolean,
  { checked, indeterminate }: CheckboxButtonProps,
): boolean => {
  if (indeterminate === true) {
    return true;
  }

  if (checked === undefined) {
    return !prevState;
  }

  return !checked;
};

const CheckboxButton = (props: CheckboxButtonProps): React.ReactElement => {
  const {
    checked,
    defaultChecked = false,
    hasError,
    indeterminate,
    onChange,
    onClick,
    ...restProps
  } = props;
  const [isCheckedState, setIsCheckedState] = React.useState(defaultChecked);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    if (typeof onClick === 'function') {
      onClick(e);
    }

    setIsCheckedState((prevState: boolean) => {
      const nextState = getNextCheckedState(prevState, props);

      if (typeof onChange === 'function') {
        onChange(nextState);
      }

      return nextState;
    });
  };

  const isChecked = checked !== undefined ? checked : isCheckedState;

  return (
    <Button
      aria-checked={indeterminate ? 'mixed' : isChecked}
      mode="single-icon"
      role="checkbox"
      style={{ transition: 'none' }}
      tabIndex={0}
      type="ghost-primary"
      onClick={handleButtonClick}
      {...restProps}
    >
      <S.IconWrapper active={indeterminate || isChecked} error={hasError}>
        <Icon
          component={
            <CheckboxButtonIcon
              checked={isChecked}
              indeterminate={indeterminate}
            />
          }
        />
      </S.IconWrapper>
    </Button>
  );
};

export default CheckboxButton;
