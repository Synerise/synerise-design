import React, { type MouseEvent } from 'react';

import { setPortalContent } from '@synerise/ds-core';
import { type ListItemProps } from '@synerise/ds-list-item';

import Confirmation from './Confirmation';
import {
  type ConfirmationHandle,
  type ConfirmationProps,
} from './Confirmation.types';

let instanceId = 0;

export const showConfirmation = <ItemType extends ListItemProps>({
  afterClose,
  onOk,
  onCancel,
  ...props
}: ConfirmationProps<ItemType>): ConfirmationHandle => {
  const cleanup = () => {
    setPortalContent(null);
  };

  const handleOk = (event: MouseEvent<HTMLElement>) => {
    Promise.resolve(onOk?.(event)).then(cleanup);
  };

  const handleCancel = (event: MouseEvent<HTMLElement>) => {
    Promise.resolve(onCancel?.(event)).then(cleanup);
  };

  instanceId += 1;
  setPortalContent(
    <Confirmation
      key={`confirmation-${instanceId}`}
      {...props}
      open
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={() => {
        afterClose?.();
        cleanup();
      }}
    />,
  );

  return {
    destroy: cleanup,
  };
};
