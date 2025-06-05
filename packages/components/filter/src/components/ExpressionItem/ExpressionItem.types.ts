import type { MouseEventHandler, ReactNode, TransitionEventHandler } from 'react';
import type { LogicProps } from '@synerise/ds-logic';
import type { StepCardProps } from '@synerise/ds-step-card';
import type { DragHandlePropType } from '@synerise/ds-sortable';
import type { Expression } from '../../Filter.types';

export type ExpressionItemProps = {
  handleTransitionEnd: TransitionEventHandler;
  id: string | number;
  expression: Expression;
  isLast?: boolean;
  dragIndex?: number;
  expressionsOrder: (string | number)[];
  readOnly?: boolean;
  stepProps: Partial<StepCardProps>;
  logicProps: Partial<LogicProps>;
  expressionIndex: number;
  dropLabel: string;
  renderHeaderRightSide?: (index: number) => ReactNode;
  handleMouseDown?: MouseEventHandler<HTMLDivElement>;
  wrapperRef: (node: HTMLDivElement) => void;
} & SortableItemProps;

export type SortableItemProps = {
  dragHandleProps?: DragHandlePropType;
  isDragged?: boolean;
  isDragOverlay?: boolean;
  isGrabbed?: boolean;
};
