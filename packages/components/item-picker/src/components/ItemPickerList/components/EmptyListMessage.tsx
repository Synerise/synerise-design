import React from 'react';

import Button from '@synerise/ds-button';
import { SearchNoResultsL } from '@synerise/ds-icon';

import * as S from '../ItemPickerList.styles';
import { type ItemPickerListTexts } from '../ItemPickerList.types';

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
  isSearchSection: boolean;
  buttonOnClick: () => void;
};

export const EmptyListMessage = ({
  texts,
  listActions,
  isSearchSection,
  hasCurrentSection,
  buttonOnClick,
}: EmptyListMessageProps) => {
  if (listActions) {
    return (
      <S.EmptyStates
        labelPosition="bottom"
        customIcon={<SearchNoResultsL />}
        label={texts.noActions}
      />
    );
  }
  if (hasCurrentSection && !isSearchSection) {
    return (
      <S.EmptyStates
        customIcon={<SearchNoResultsL />}
        label={texts.noResultsInSection}
        labelPosition="bottom"
        button={
          <Button type="primary" onClick={buttonOnClick}>
            {texts.searchAllFoldersButtonLabel}
          </Button>
        }
      />
    );
  }
  return (
    <S.EmptyStates
      labelPosition="bottom"
      customIcon={<SearchNoResultsL />}
      label={texts.noResults}
    />
  );
};
