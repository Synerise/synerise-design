import React from 'react';
import Icon from '@synerise/ds-icon';

import { getActionItem, matchesSearchQuery } from '../hooks/useItemsInSections.utils';
import type { SearchActionType, SearchParamConfig } from '../../ItemPickerNew/ItemPickerNew.types';

type GetSearchActionItemsOptions = {
  action: SearchActionType;
  setSearchActionSection: (value: SearchActionType | undefined) => void;
  setSearchParamConfig: (value: SearchParamConfig | undefined) => void;
  searchQuery?: string;
};

export const getSearchActionItems = ({
  action,
  searchQuery,
  setSearchParamConfig,
  setSearchActionSection,
}: GetSearchActionItemsOptions) => {
  const filteredSearchParams = action?.searchParams?.filter(searchParam => {
    if (!searchQuery) {
      return true;
    }
    return matchesSearchQuery(searchParam.searchLabel || searchParam.paramKeyLabel, searchQuery);
  });

  return filteredSearchParams.map(searchParam =>
    getActionItem(
      {
        text: searchParam.paramListLabel,
        id: searchParam.paramKey,
        actionType: 'custom',
        prefixel: searchParam.icon ? <Icon component={searchParam.icon} /> : undefined,
        onClick: () => {
          setSearchParamConfig(searchParam);
          setSearchActionSection(undefined);
        },
      },
      searchQuery
    )
  );
};
