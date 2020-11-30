import * as React from 'react';

export type StepProps = {
  label: string | React.ReactNode;
  stepNumber: number;
  active?: boolean;
  done?: boolean;
  validated?: boolean;
  tooltip?: string | React.ReactNode;
  onClick: () => void;
};
