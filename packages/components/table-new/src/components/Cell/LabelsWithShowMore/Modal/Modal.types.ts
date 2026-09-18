import type React from 'react';

import type { ObjectStringKeys } from '@synerise/ds-utils';

import type { ShowMoreTexts } from '../LabelsWithShowMore.types';

// biome-ignore lint/suspicious/noExplicitAny: upstream type is not expressible here
export type DataSourceType = Record<string, any> & {
  key: React.ReactText;
};

export type ModalProps<T extends DataSourceType> = {
  isOpen: boolean;
  items: T[];
  hide: () => void;
  renderItem: (label: string, item: T) => JSX.Element | React.Component;
  labelKey: ObjectStringKeys<T>;
  texts: ShowMoreTexts;
  loading?: boolean;
};
