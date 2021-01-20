import * as React from 'react';

export type StepCardProps = {
  footer?: React.ReactNode;
  matching: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onChangeMatching: (matching: boolean) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  texts: {
    matching: string;
    notMatching: string;
    namePlaceholder: string;
    moveTooltip: string;
    deleteTooltip: string;
    duplicateTooltip: string;
  };
};
