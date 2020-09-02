import { NotificationsM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';

export const SUBJECT_TEXTS = {
  searchPlaceholder: 'Search',
  noResults: 'No results',
}

export const SUBJECT_ITEMS = [...new Array(30)].map((i, index) => ({
  id: index,
  name: `Attribute #${index}`,
  icon: <NotificationsM />,
}));
