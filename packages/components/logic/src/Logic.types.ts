import React from 'react';
import Matching from './Matching/Matching';

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
