import * as React from 'react';
import Alert from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import Icon, { RefreshM } from '@synerise/ds-icon';
import { TableLocaleContext } from '../utils/locale';
import { Loader } from './InfiniteLoaderItem.styles';
import { InfiniteScrollProps, LoaderItemProps } from './InfiniteLoaderItem.types';
import { infiniteScrollPropsToState } from './utils';

const LoadingItem = (): React.ReactElement => (
  <TableLocaleContext.Consumer>
    {(tableLocale): React.ReactElement => <Loader size="M" label={tableLocale.infiniteScrollLoading} />}
  </TableLocaleContext.Consumer>
);

const NoMoreItem = (): React.ReactElement => (
  <TableLocaleContext.Consumer>
    {(tableLocale): React.ReactElement => (
      <Alert.InlineAlert
        // @ts-ignore
        type="info"
        message={tableLocale.infiniteScrollNoMoreData}
      />
    )}
  </TableLocaleContext.Consumer>
);

interface ErrorItemProps {
  onRetryClick?: InfiniteScrollProps['onRetryButtonClick'];
}

const ErrorItem = ({ onRetryClick }: ErrorItemProps): React.ReactElement => (
  <TableLocaleContext.Consumer>
    {(tableLocale): React.ReactElement => (
      <div style={{ display: 'flex' }}>
        <Alert.InlineAlert
          // @ts-ignore
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
      </div>
    )}
  </TableLocaleContext.Consumer>
);

const InfiniteLoaderItem = ({ infiniteScroll }: LoaderItemProps): React.ReactElement => {
  const { hasMore, isLoading, hasError, onRetryButtonClick, render } = infiniteScroll;

  if (typeof render === 'function') {
    return render(infiniteScrollPropsToState(infiniteScroll));
  }

  return (
    <>
      {isLoading && <LoadingItem />}
      {!isLoading && !hasMore && <NoMoreItem />}
      {!isLoading && hasError && <ErrorItem onRetryClick={onRetryButtonClick} />}
    </>
  );
};

export default InfiniteLoaderItem;
