import * as React from 'react';

export type ItemRendererProps = {
  highlight: string;
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};
