import { type ReactNode } from 'react';

import {
  type BaseItemType,
  type BaseSectionType,
  type InheritedFromListItem,
} from './baseItemSectionType.types';

export const ACTION_TYPES = {
  redirect: 'redirect',
  custom: 'custom',
  searchBy: 'searchBy',
  searchIn: 'searchIn',
} as const;

type BasicAction = Omit<InheritedFromListItem, 'onClick'> & {
  sectionId?: BaseSectionType['id'];
  id: string | number;
  text: ReactNode;
  icon?: ReactNode;
};

type RedirectAction = BasicAction & {
  actionType: typeof ACTION_TYPES.redirect;
};

type CustomAction = BasicAction & {
  actionType: typeof ACTION_TYPES.custom;
  onClick: (action: Action) => void;
};

export type SearchByConfig = {
  actionType: typeof ACTION_TYPES.searchBy;
  sectionTitle?: ReactNode;
  searchParams: SearchByParamConfig[];
  onSearchByParamClick?: (searchByParam: SearchByParamConfig) => void;
};

export type SearchByParamConfig = {
  searchLabel?: ReactNode;
  paramKeyLabel?: ReactNode;
  paramListLabel: ReactNode;
  paramKey: string;
  icon?: ReactNode;
};

export type SearchByAction = BasicAction & SearchByConfig;

export type SearchInConfig = {
  actionType: typeof ACTION_TYPES.searchIn;
  loadItemsSectionId?: BaseSectionType['id'];
  searchInSectionId?: BaseSectionType['id'];
  renderSearchInValueText: (item: BaseItemType) => ReactNode;
  onSearchInItemClick?: (item: BaseItemType) => void;
};

export type SearchInAction = BasicAction & SearchInConfig;

export const CONTEXT_AWARE_ACTIONS = [
  ACTION_TYPES.searchBy,
  ACTION_TYPES.searchIn,
] as const;

export type ContextAwareActionType = (typeof CONTEXT_AWARE_ACTIONS)[number];

export type Action =
  | RedirectAction
  | CustomAction
  | SearchByAction
  | SearchInAction;

export type ContextAwareAction = Extract<
  Action,
  { actionType: ContextAwareActionType }
>;
