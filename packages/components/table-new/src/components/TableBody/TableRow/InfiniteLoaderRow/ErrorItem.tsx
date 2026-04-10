import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { RefreshM } from '@synerise/ds-icon';
import InlineAlert from '@synerise/ds-inline-alert';

import { type InfiniteLoaderRowTexts } from '../../../../Table.types';
import * as S from './ErrorItem.styles';

type ErrorItemProps = {
  onRetryClick?: () => void;
  texts: InfiniteLoaderRowTexts;
};

export const ErrorItem = ({ onRetryClick, texts }: ErrorItemProps) => {
  return (
    <S.ErrorItemWrapper>
      <InlineAlert type="alert" message={texts.infiniteScrollError} />
      {onRetryClick && (
        <Button
          onClick={onRetryClick}
          type="ghost"
          mode="icon-label"
          icon={<Icon component={<RefreshM />} />}
          style={{ marginLeft: 8 }}
        >
          {texts.infiniteScrollRetry}
        </Button>
      )}
    </S.ErrorItemWrapper>
  );
};
