import * as React from 'react';

export type RemoveIconProps = {
  id: string;
  handleRemove: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};
