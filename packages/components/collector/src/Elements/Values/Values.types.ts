import * as React from 'react';

export type ValuesProps = {
  values: React.ReactText[];
  onRemove: (removedValue: React.ReactText) => void;
  focused: boolean;
  disabled: boolean;
};
