import * as React from 'react';
import Result from '@synerise/ds-result';
import * as S from '../ColumnManagerList/ColumnManager.style';
import { SearchResults } from './ColumnMangerSearchResults.styles';
import ColumnManagerItem from '../ColumnManagerItem/ColumnManagerItem';
import { Props } from './ColumManagerResults.types';

const ColumnManagerSearchResults: React.FC<Props> = ({ searchResults, searchQuery, setFixed, switchAction, texts }) => {
  return (
    <SearchResults>
      {searchResults.length ? (
        <>
          <S.ListHeadline>{texts.searchResults}</S.ListHeadline>
          {searchResults.map(
            (column): React.ReactNode => (
              <ColumnManagerItem
                key={column.id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...column}
                setFixed={setFixed}
                switchAction={(): void => switchAction(column.id, column.visible)}
                searchQuery={searchQuery}
                data-testid="ds-column-manager-filtered-item"
                texts={texts}
              />
            )
          )}
        </>
      ) : (
        <Result description={texts.noResults} type="no-results" noSearchResults />
      )}
    </SearchResults>
  );
};

export default ColumnManagerSearchResults;
