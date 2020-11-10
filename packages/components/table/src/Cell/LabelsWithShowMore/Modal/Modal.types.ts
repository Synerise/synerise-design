import * as React from 'react';

export type ModalProps<T extends object> = {
  visible: boolean;
  items: T[];
  hide: () => void;
  title: string | React.ReactNode;
  renderItem: (label: string, item: T) => Element;
  labelKey: string;
};
