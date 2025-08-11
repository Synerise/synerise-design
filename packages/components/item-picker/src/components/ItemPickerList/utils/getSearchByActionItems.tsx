import React from 'react';

import Icon from '@synerise/ds-icon';

import type {
  SearchByAction,
  SearchByParamConfig,
} from '../../ItemPickerNew/types/actions.types';
import { matchesSearchQuery } from '../hooks/useItemsInSections.utils';
import { getActionItem } from './actionItemsUtils';

type GetSearchByActionItemsOptions = {
  action: SearchByAction;
  setSearchByAction: (value: SearchByAction | undefined) => void;
  setSearchByParamConfig: (value: SearchByParamConfig | undefined) => void;
  changeSearchQuery: (query: string) => void;
  searchQuery?: string;
};

export const getSearchByActionItems = ({
  action,
  searchQuery,
  setSearchByParamConfig,
  setSearchByAction,
  changeSearchQuery,
}: GetSearchByActionItemsOptions) => {
  const filteredSearchParams = action?.searchParams?.filter((searchParam) => {
    if (!searchQuery) {
      return true;
    }
    return matchesSearchQuery(
      searchParam.searchLabel || searchParam.paramKeyLabel,
      searchQuery,
    );
  });

  return filteredSearchParams.map((searchParam) =>
    getActionItem(
      {
        text: searchParam.paramListLabel,
        id: searchParam.paramKey,
        actionType: 'custom',
        prefixel: searchParam.icon ? (
          <Icon component={searchParam.icon} />
        ) : undefined,
        onClick: () => {
          changeSearchQuery('');
          setSearchByParamConfig(searchParam);
          setSearchByAction(undefined);
          action.onSearchByParamClick?.(searchParam);
        },
      },
      searchQuery,
    ),
  );
};
