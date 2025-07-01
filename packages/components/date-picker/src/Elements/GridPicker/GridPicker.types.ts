import type React from 'react';

export type Cell = {
  disabled?: boolean;
  key: React.ReactText;
  outside: boolean;
  text: React.ReactText;
};
export type GridPickerProps = {
  selectedKey: React.ReactText | null;
  cells: Cell[];
  onCellClick: (key: React.ReactText) => void;
};
