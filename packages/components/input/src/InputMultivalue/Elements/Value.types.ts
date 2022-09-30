import * as React from 'react';

export interface Props {
  disabled?: boolean;
  key?: string;
  onRemoveClick: () => void;
  removeIcon?: boolean;
  value: React.ReactText;
  focused?: boolean;
  onEditClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}
