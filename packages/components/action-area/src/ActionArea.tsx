import classnames from 'classnames';
import React from 'react';

import { Description, Title } from '@synerise/ds-typography';

import * as S from './ActionArea.styles';
import type { ActionAreaProps } from './ActionArea.types';
import { renderAction } from './ActionArea.utils';

const ActionArea = ({
  label,
  description,
  isFullWidth = false,
  isError = false,
  errorText,
  className,
  style,
  ...rest
}: ActionAreaProps) => {
  const isErrorText = isError && Boolean(errorText);
  const actionContent = renderAction(rest);
  return (
    <S.ActionAreaWrapper
      style={style}
      className={classnames('ds-action-area', className)}
      isFullWidth={isFullWidth}
    >
      <S.ActionAreaContent isError={isError} data-testid="action-area-content">
        {label && <Title level={6}>{label}</Title>}
        <Description>{description}</Description>
        <S.ActionAreaAction>{actionContent}</S.ActionAreaAction>
      </S.ActionAreaContent>
      {isErrorText && <S.ErrorText>{errorText}</S.ErrorText>}
    </S.ActionAreaWrapper>
  );
};

ActionArea.ActionAreaWrapper = S.ActionAreaWrapper;
ActionArea.ActionAreaContent = S.ActionAreaContent;
ActionArea.ErrorText = S.ErrorText;
export default ActionArea;
