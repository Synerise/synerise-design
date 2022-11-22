import * as React from 'react';

export type StepCardTexts = {
  matching: string;
  notMatching: string;
  conditionType: string;
  notConditionType: string;
  namePlaceholder: string;
  moveTooltip: string;
  deleteTooltip: string;
  duplicateTooltip: string;
};

export type StepCardProps = {
  footer?: React.ReactNode;
  matching: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onChangeMatching: (matching: boolean) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  texts?: StepCardTexts;
  isHeaderVisible?: boolean;
};
