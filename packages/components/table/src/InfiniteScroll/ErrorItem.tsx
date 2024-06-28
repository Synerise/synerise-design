import React from 'react';
import Alert from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import Icon, { RefreshM } from '@synerise/ds-icon';

import { TableLocaleContext } from '../utils/locale';

type ErrorItemProps = {
  onRetryClick?: () => void;
};

export const ErrorItem = ({ onRetryClick }: ErrorItemProps) => (
  <TableLocaleContext.Consumer>
    {tableLocale => (
      <div style={{ display: 'flex' }}>
        <Alert.InlineAlert type="alert" message={tableLocale.infiniteScrollError} />
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
      </div>
    )}
  </TableLocaleContext.Consumer>
);
