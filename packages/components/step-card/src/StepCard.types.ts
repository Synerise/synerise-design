import { ReactNode } from 'react';

export type StepCardTexts = {
  matching: string;
  notMatching: string;
  conditionType: string;
  notConditionType: string;
  namePlaceholder: string;
  moveTooltip: string;
  moveUpTooltip: string;
  moveDownTooltip: string;
  deleteTooltip: string;
  duplicateTooltip: string;
};

export type StepCardProps = {
  footer?: ReactNode;
  children?: ReactNode;
  matching: boolean;
  name: string;
  onChangeName?: (name: string) => void;
  onChangeMatching?: (matching: boolean) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMove: (index: number, offset: number) => void;
  expressionIndex: number;
  expressionCount: number;
  expressionMoved?: boolean;
  texts?: StepCardTexts;
  isHeaderVisible?: boolean;
  isDraggable?: boolean;
  readOnly?: boolean;
  singleStepCondition?: boolean;
  headerRightSide?: ReactNode;
  getMoveByLabel?: (moveByOffset: number) => string;
  additionalFields?: JSX.Element;
};
