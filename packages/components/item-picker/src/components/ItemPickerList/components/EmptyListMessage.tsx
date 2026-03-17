import React, { type ReactElement, type ReactNode } from 'react';

import Button from '@synerise/ds-button';
import { NoData, SearchNoResultsL } from '@synerise/ds-icon';

import { type BaseSectionType } from '../../ItemPickerNew/types/baseItemSectionType.types';
import { type ItemPickerListTexts } from '../../ItemPickerNew/types/itemPickerListTexts.types';
import * as S from '../ItemPickerList.styles';

type EmptyListMessageProps = {
  texts: Pick<
    ItemPickerListTexts,
    | 'noResultsInSection'
    | 'noResults'
    | 'noItems'
    | 'noActions'
    | 'emptyStateLabel'
    | 'searchAllFoldersButtonLabel'
  >;
  hasCurrentSection?: boolean;
  listActions: boolean;
  isActionSection: boolean;
  buttonOnClick: () => void;
  currentSection: BaseSectionType | undefined;
  searchQuery: string;
  emptyListIcon?: ReactElement;
  noResultsIcon?: ReactElement;
  emptyStateComponent?: ReactNode;
  noResultsComponent?: ReactNode;
};

export const EmptyListMessage = ({
  texts,
  listActions,
  isActionSection,
  hasCurrentSection,
  buttonOnClick,
  currentSection,
  searchQuery,
  emptyListIcon,
  noResultsIcon,
  emptyStateComponent,
  noResultsComponent,
}: EmptyListMessageProps) => {
  if (listActions) {
    return (
      <S.EmptyStates
        customIcon={<SearchNoResultsL />}
        label={texts.noActions}
      />
    );
  }
  if (hasCurrentSection && !isActionSection) {
    return (
      <S.EmptyStates
        customIcon={<SearchNoResultsL />}
        label={
          currentSection?.texts?.noResultsInSection || texts.noResultsInSection
        }
        button={
          <Button type="primary" onClick={buttonOnClick}>
            {currentSection?.texts?.searchAllFoldersButtonLabel ||
              texts.searchAllFoldersButtonLabel}
          </Button>
        }
      />
    );
  }

  if (!searchQuery) {
    if (emptyStateComponent) {
      return <>{emptyStateComponent}</>;
    }
    return (
      <S.EmptyStates
        customIcon={emptyListIcon || <NoData />}
        label={texts.emptyStateLabel}
      />
    );
  }

  if (noResultsComponent) {
    return <>{noResultsComponent}</>;
  }
  return (
    <S.EmptyStates
      customIcon={noResultsIcon || <SearchNoResultsL />}
      label={texts.noResults}
    />
  );
};
