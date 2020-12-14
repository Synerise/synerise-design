import * as React from 'react';

export type LogicOperatorValue = 'AND' | 'OR' | string;

export type LogicOperator = {
  value: string;
  label: string | React.ReactNode;
};

export type LogicProps = {
  value: LogicOperatorValue;
  options?: LogicOperator[];
  onChange: (value: LogicOperatorValue) => void;
};
