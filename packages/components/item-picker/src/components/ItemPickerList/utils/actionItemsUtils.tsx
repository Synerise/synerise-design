import { type ListItemProps } from '@synerise/ds-list-item';

import {
  ACTION_TYPES,
  type Action,
  type ContextAwareActionType,
  type SearchByAction,
  type SearchByParamConfig,
  type SearchInAction,
} from '../../ItemPickerNew/types/actions.types';
import { type ItemPickerListTexts } from '../../ItemPickerNew/types/itemPickerListTexts.types';
import {
  getTitleItem,
  matchesSearchQuery,
} from '../hooks/useItemsInSections.utils';
import { isSearchByAction, isSearchInAction, isTruthy } from '../utils';
import { getContextAwareActions } from './getContextAwareActions';

export const getActionItem = (
  action: Action & { onClick?: (action: Action) => void },
  searchQuery?: string,
): ListItemProps => {
  return {
    ...action,
    highlight: searchQuery,
    onClick:
      'onClick' in action && action.onClick
        ? () => action.onClick?.(action)
        : undefined,
  };
};

export const getActionItems = ({
  actions,
  texts,
  searchQuery,
  sectionId,
  setSearchByAction,
  setSearchInAction,
  changeSearchQuery,
  isSearchInItemActive,
  searchByParamConfig,
  setSearchByParamConfig,
}: {
  actions?: Action[];
  texts: ItemPickerListTexts;
  searchQuery?: string;
  sectionId: string | undefined;
  setSearchByAction: (value: SearchByAction | undefined) => void;
  setSearchInAction: (value: SearchInAction | undefined) => void;
  changeSearchQuery: (query: string) => void;
  isSearchInItemActive: boolean;
  searchByParamConfig: SearchByParamConfig | undefined;
  setSearchByParamConfig: (value: SearchByParamConfig | undefined) => void;
}) => {
  if (!actions?.length) {
    return [];
  }

  const filteredActions = searchByParamConfig
    ? actions.filter((action) => action.actionType === ACTION_TYPES.searchIn)
    : actions;

  if (!filteredActions?.length) {
    return [];
  }

  const contextAwareActions = getContextAwareActions(
    filteredActions,
    sectionId,
  );

  const isRenderedSingleAction: Record<ContextAwareActionType, boolean> = {
    searchBy: false,
    searchIn: false,
  };

  const renderedActions = filteredActions.map((action) => {
    switch (action.actionType) {
      case ACTION_TYPES.searchBy: {
        const searchByAction =
          isSearchByAction(contextAwareActions.searchBy) &&
          contextAwareActions.searchBy;

        if (isRenderedSingleAction.searchBy) {
          return undefined;
        }
        if (!searchByAction || !searchByAction.searchParams?.length) {
          return undefined;
        }
        isRenderedSingleAction.searchBy = true;
        return getActionItem(
          {
            ...searchByAction,
            onClick: () => {
              changeSearchQuery('');
              setSearchByAction(searchByAction);
            },
          },
          searchQuery,
        );
      }
      case ACTION_TYPES.searchIn: {
        if (isRenderedSingleAction.searchIn) {
          return undefined;
        }
        const searchInAction =
          isSearchInAction(contextAwareActions.searchIn) &&
          contextAwareActions.searchIn;

        if (
          !searchInAction ||
          !searchInAction.loadItemsSectionId ||
          isSearchInItemActive
        ) {
          return undefined;
        }
        isRenderedSingleAction.searchIn = true;

        return getActionItem(
          {
            ...searchInAction,
            onClick: () => {
              changeSearchQuery('');
              setSearchByParamConfig(undefined);
              setSearchInAction(searchInAction);
            },
          },
          searchQuery,
        );
      }
      default: {
        return getActionItem(action, searchQuery);
      }
    }
  });

  const validRenderedActions = renderedActions.filter(isTruthy);

  if (!validRenderedActions.length) {
    return [];
  }

  return [getTitleItem(texts.actionsSectionLabel), ...validRenderedActions];
};

export const getSectionActionItems = ({
  actions,
  texts,
  sectionId,
  searchQuery,
  setSearchByAction,
  setSearchInAction,
  changeSearchQuery,
  isSearchInItemActive,
  searchByParamConfig,
  setSearchByParamConfig,
}: {
  actions?: Action[];
  texts: ItemPickerListTexts;
  sectionId?: string;
  searchQuery?: string;
  setSearchByAction: (value: SearchByAction | undefined) => void;
  setSearchInAction: (value: SearchInAction | undefined) => void;
  changeSearchQuery: (query: string) => void;
  isSearchInItemActive: boolean;
  searchByParamConfig: SearchByParamConfig | undefined;
  setSearchByParamConfig: (value: SearchByParamConfig | undefined) => void;
}) => {
  const filteredActions = actions?.filter(
    (action) =>
      (action.actionType === ACTION_TYPES.searchBy ||
        action.actionType === ACTION_TYPES.searchIn ||
        action.sectionId === sectionId) &&
      (!searchQuery || matchesSearchQuery(action.text, searchQuery)),
  );
  return getActionItems({
    actions: filteredActions,
    texts,
    searchQuery,
    sectionId,
    setSearchByAction,
    setSearchInAction,
    changeSearchQuery,
    isSearchInItemActive,
    searchByParamConfig,
    setSearchByParamConfig,
  });
};
