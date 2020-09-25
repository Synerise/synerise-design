import * as React from 'react';

export interface Props {
  disabled?: boolean;
  key?: string;
  onRemoveClick: () => void;
  value: React.ReactText;
  focused?: boolean;
}