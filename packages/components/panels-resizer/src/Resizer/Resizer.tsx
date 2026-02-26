import React, { type MouseEvent } from 'react';

import { DragHandleM } from '@synerise/ds-icon';

import { Handler, HandlerIcon } from './Resizer.styles';

type ResizerProps = {
  onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
  isHorizontal?: boolean;
};

const HANDLER_WIDTH = 16;

export const Resizer = ({
  onMouseDown,
  isHorizontal = false,
}: ResizerProps) => (
  <Handler
    data-testid="resizer-handler"
    onMouseDown={onMouseDown}
    isHorizontal={isHorizontal}
  >
    <HandlerIcon
      component={<DragHandleM />}
      size={HANDLER_WIDTH}
      isHorizontal={isHorizontal}
    />
  </Handler>
);
