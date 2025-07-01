import type React from 'react';

import type Matching from './Matching/Matching';

export type LogicOperatorValue = 'AND' | 'OR' | string;

export type LogicOperator = {
  value: string;
  label: string | React.ReactNode;
};

export type LogicProps = {
  value: LogicOperatorValue;
  options?: LogicOperator[];
  onChange: (value: LogicOperatorValue) => void;
  readOnly?: boolean;
};

export type LogicSubComponents = {
  Matching: typeof Matching;
};
