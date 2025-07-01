import React, { type ReactNode } from 'react';

import Button from '@synerise/ds-button';

import {
  type ActionAreaWithCustomActionProps,
  type ActionAreaWithStandardActionProps,
} from './ActionArea.types';

const isCustomActionArea = (
  props: Partial<
    ActionAreaWithCustomActionProps | ActionAreaWithStandardActionProps
  >,
): props is ActionAreaWithCustomActionProps => {
  return 'customAction' in props;
};

export const renderAction = (
  props: ActionAreaWithCustomActionProps | ActionAreaWithStandardActionProps,
): ReactNode => {
  if (isCustomActionArea(props)) {
    const { customAction } = props;
    return customAction;
  }
  const { action, actionLabel, buttonProps } = props;
  return (
    <Button type="primary" onClick={action} {...buttonProps}>
      {actionLabel}
    </Button>
  );
};
