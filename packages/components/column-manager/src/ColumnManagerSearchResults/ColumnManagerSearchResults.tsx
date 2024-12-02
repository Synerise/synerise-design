import React from 'react';
import Result from '@synerise/ds-result';

import * as S from '../ColumnManagerList/ColumnManager.style';
import { SearchResults } from './ColumnMangerSearchResults.styles';
import ColumnManagerItem from '../ColumnManagerItem/ColumnManagerItem';
import { Props } from './ColumManagerResults.types';

const ColumnManagerSearchResults = ({
  searchResults,
  searchQuery,
  setFixed,
  switchAction,
  texts,
  showGroupSettings,
}: Props) => {
  return (
    <SearchResults>
      {searchResults.length ? (
        <>
          <S.ListHeadline>{texts.searchResults}</S.ListHeadline>
          {searchResults.map(column => (
            <ColumnManagerItem
              key={column.id}
              item={column}
              setFixed={setFixed}
              showGroupSettings={showGroupSettings}
              switchAction={() => switchAction(column.id, column.visible)}
              searchQuery={searchQuery}
              data-testid="ds-column-manager-filtered-item"
              texts={texts}
            />
          ))}
        </>
      ) : (
        <Result description={texts.noResults} type="no-results" noSearchResults />
      )}
    </SearchResults>
  );
};

export default ColumnManagerSearchResults;
