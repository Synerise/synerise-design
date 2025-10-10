import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { HideM, ShowM } from '@synerise/ds-icon';

import { Input } from './Input';
import type {
  PasswordInputProps,
  PasswordInputTexts,
} from './PasswordInput.types';

export const PasswordInput = ({ texts, ...inputProps }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const allTexts = {
    showText: (
      <FormattedMessage
        id="DS.INPUT.SHOW-PASSWORD"
        defaultMessage="Show password"
      />
    ),
    hideText: (
      <FormattedMessage
        id="DS.INPUT.HIDE-PASSWORD"
        defaultMessage="Hide password"
      />
    ),
    ...texts,
  } satisfies PasswordInputTexts;

  const inputConfig = {
    text: {
      type: 'text',
      icon: <HideM />,
      tooltip: allTexts.hideText,
    },
    password: {
      type: 'password',
      icon: <ShowM />,
      tooltip: allTexts.showText,
    },
  };

  const inputState = isVisible ? inputConfig.text : inputConfig.password;

  const passwordIcon = (
    <Icon
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsVisible((value) => !value);
      }}
      component={inputState.icon}
    />
  );

  return (
    <Input
      {...inputProps}
      type={inputState.type}
      icon1={passwordIcon}
      icon1Tooltip={<>{inputState.tooltip}</>}
    />
  );
};
