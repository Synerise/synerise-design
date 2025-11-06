import { type ReactNode } from 'react';

type TextsAsReactNode =
  | 'basicSearchPlaceholder'
  | 'searchPlaceholder'
  | 'refreshButtonLabel'
  | 'showMoreResultsLabel'
  | 'noItems'
  | 'noResults'
  | 'noResultsInSection'
  | 'searchAllFoldersButtonLabel'
  | 'recentsSectionLabel'
  | 'actionsSectionLabel'
  | 'resultsSectionLabel'
  | 'noActions'
  | 'itemsSectionLabel'
  | 'infiniteScrollLoadingMore'
  | 'infiniteScrollLoadingError'
  | 'errorMessageTitle'
  | 'errorMessageDetails'
  | 'backTooltip'
  | 'clearSearchTooltip'
  | 'infiniteScrollAllLoaded';

export type ItemPickerListTexts = {
  [key in TextsAsReactNode]: ReactNode;
};
