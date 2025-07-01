import React from 'react';

import Alert from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import Icon, { RefreshM } from '@synerise/ds-icon';

import { useTableLocaleContext } from '../utils/locale';
import * as S from './ErrorItem.styles';

type ErrorItemProps = {
  onRetryClick?: () => void;
};

export const ErrorItem = ({ onRetryClick }: ErrorItemProps) => {
  const tableLocale = useTableLocaleContext();
  return (
    <S.ErrorItemWrapper>
      <Alert.InlineAlert
        type="alert"
        message={tableLocale.infiniteScrollError}
      />
      {onRetryClick && (
        <Button
          onClick={onRetryClick}
          type="ghost"
          mode="icon-label"
          icon={<Icon component={<RefreshM />} />}
          style={{ marginLeft: 8 }}
        >
          {tableLocale.infiniteScrollRetry}
        </Button>
      )}
    </S.ErrorItemWrapper>
  );
};
