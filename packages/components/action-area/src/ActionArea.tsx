import React from 'react';
import classnames from 'classnames';

import Button from '@synerise/ds-button';
import { Title, Description } from '@synerise/ds-typography';

import type { ActionAreaProps } from './ActionArea.types';
import * as S from './ActionArea.styles';

const ActionArea = ({
  label,
  description,
  action,
  actionLabel,
  buttonProps,
  isFullWidth = false,
  isError = false,
  errorText,
  className,
  style,
}: ActionAreaProps) => {
  const isErrorText = isError && Boolean(errorText);
  return (
    <S.ActionAreaWrapper style={style} className={classnames('ds-action-area', className)} isFullWidth={isFullWidth}>
      <S.ActionAreaContent isError={isError} data-testid="action-area-content">
        {label && <Title level={6}>{label}</Title>}
        <Description>{description}</Description>
        <Button type="primary" onClick={action} {...buttonProps}>
          {actionLabel}
        </Button>
      </S.ActionAreaContent>
      {isErrorText && <S.ErrorText>{errorText}</S.ErrorText>}
    </S.ActionAreaWrapper>
  );
};

ActionArea.ActionAreaWrapper = S.ActionAreaWrapper;
ActionArea.ActionAreaContent = S.ActionAreaContent;
ActionArea.ErrorText = S.ErrorText;
export default ActionArea;
