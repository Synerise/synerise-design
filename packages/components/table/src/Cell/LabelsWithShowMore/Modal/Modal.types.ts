import type React from 'react';

import { type ObjectStringKeys } from '@synerise/ds-utils';

import { type ShowMoreTexts } from '../LabelsWithShowMore.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataSourceType = Record<string, any> & {
  key: React.ReactText;
};

export type ModalProps<T extends DataSourceType> = {
  visible: boolean;
  items: T[];
  hide: () => void;
  renderItem: (label: string, item: T) => JSX.Element | React.Component;
  labelKey: ObjectStringKeys<T>;
  texts: ShowMoreTexts;
  loading?: boolean;
};
