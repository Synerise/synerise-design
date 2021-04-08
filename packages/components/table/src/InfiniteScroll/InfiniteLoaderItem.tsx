import * as React from 'react';
import Alert from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { RefreshM } from '@synerise/ds-icon/dist/icons';
import Loader from '@synerise/ds-loader';
import { InfiniteScrollProps } from './constants';

export interface LoaderItemProps {
  infiniteScroll: InfiniteScrollProps;
  // TODO: add message labels
  // locale: ??
}

const NoMoreItem = (): React.ReactElement => (
  // TODO: add type="info" to InlineAlert
  // TODO: add locale
  <Alert.InlineAlert type="warning" message="There is no more data to load" />
);

interface ErrorItemProps {
  onRetryClick?: InfiniteScrollProps['onRetryButtonClick'];
}

const ErrorItem = ({ onRetryClick }: ErrorItemProps): React.ReactElement => (
  <div style={{ display: 'flex' }}>
    {/* TODO: add locale */}
    <Alert.InlineAlert type="alert" message="Can't fetch data" />
    {onRetryClick && (
      <Button
        onClick={onRetryClick}
        type="ghost"
        mode="icon-label"
        icon={<Icon component={<RefreshM />} />}
        style={{ marginLeft: 8 }}
      >
        {/* TODO: add locale */}
        Retry
      </Button>
    )}
  </div>
);

const InfiniteLoaderItem = ({ infiniteScroll }: LoaderItemProps): React.ReactElement => {
  const { hasMore, isLoading, hasError, onRetryButtonClick } = infiniteScroll;

  // TODO: add custom renderer

  return (
    <>
      {/* TODO: add locale */}
      {isLoading && <Loader size="M" label="Loading more items" />}
      {!isLoading && !hasMore && <NoMoreItem />}
      {!isLoading && hasError && <ErrorItem onRetryClick={onRetryButtonClick} />}
    </>
  );
};

export default InfiniteLoaderItem;
