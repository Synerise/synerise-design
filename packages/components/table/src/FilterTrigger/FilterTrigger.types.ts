import type React from 'react';

export interface Props {
  name: string;
  selected?: {
    name: string;
  };
  iconComponent: React.ReactNode;
  tooltips: {
    default: string;
    define: string;
    clear: string;
    list: string;
  };
  openedLabel: string;
  handleClear: () => void;
  showList: () => void;
  show: () => void;
  disabled?: boolean;
}
