import React, { useMemo } from 'react';

import Icon from '@synerise/ds-icon';

import { ICONS } from './InlineAlert.const';
import * as S from './InlineAlert.styles';
import { type InlineAlertProps } from './InlineAlert.types';

const InlineAlert = ({
  className,
  type = 'warning',
  message,
  withLink,
  withEmphasis,
  hoverButton,
  disabled,
  customIcon,
  ...rest
}: InlineAlertProps) => {
  const icon = useMemo(() => {
    return ICONS[type];
  }, [type]);
  return (
    <S.InlineAlertWrapper
      {...rest}
      type={type}
      disabled={disabled}
      hoverButton={hoverButton}
      className={`ds-inline-alert ${className || ''}`}
    >
      {customIcon || <Icon component={icon} />}
      {message && (
        <S.Message>
          {message}
          {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
          {withEmphasis && !withLink && (
            <S.EmphasisWrapper>{withEmphasis}</S.EmphasisWrapper>
          )}
        </S.Message>
      )}
    </S.InlineAlertWrapper>
  );
};

export default InlineAlert;
