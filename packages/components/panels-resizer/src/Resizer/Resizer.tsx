import React from 'react';
import type { MouseEvent } from 'react';

import { DragHandleM } from '@synerise/ds-icon';

import { Handler, HandlerIcon } from './Resizer.styles';

type ResizerProps = {
  onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
};

const HANDLER_WIDTH = 16;

export const Resizer = ({ onMouseDown }: ResizerProps) => (
  <Handler data-testid="resizer-handler" onMouseDown={onMouseDown} width={HANDLER_WIDTH}>
    <HandlerIcon component={<DragHandleM />} size={HANDLER_WIDTH} />
  </Handler>
);
