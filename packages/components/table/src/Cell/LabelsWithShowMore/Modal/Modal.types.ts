import type React from 'react';

import { type ShowMoreTexts } from '../LabelsWithShowMore.types';

export type DataSourceType = object & {
  key: React.ReactText;
};

export type ModalProps<T extends DataSourceType> = {
  visible: boolean;
  items: T[];
  hide: () => void;
  renderItem: (label: string, item: T) => JSX.Element | React.Component;
  labelKey: string;
  texts: ShowMoreTexts;
  loading?: boolean;
};
