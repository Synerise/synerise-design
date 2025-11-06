import React from 'react';

import Button from '@synerise/ds-button';
import { SearchNoResultsL } from '@synerise/ds-icon';

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
    | 'searchAllFoldersButtonLabel'
  >;
  hasCurrentSection?: boolean;
  listActions: boolean;
  isActionSection: boolean;
  buttonOnClick: () => void;
  currentSection: BaseSectionType | undefined;
};

export const EmptyListMessage = ({
  texts,
  listActions,
  isActionSection,
  hasCurrentSection,
  buttonOnClick,
  currentSection,
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
  return (
    <S.EmptyStates customIcon={<SearchNoResultsL />} label={texts.noResults} />
  );
};
