import * as React from 'react';

export type EditListProps = {
  autocompleteOptions?: string | React.ReactNode;
  leftColumnName?: string | React.ReactNode;
  rightColumnName?: string | React.ReactNode;
  onChange?: () => void;
  onSearch?: (query: string) => void;
  text?: string;
};
