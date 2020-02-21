import * as React from 'react';
import Result from '@synerise/ds-result';
import * as S from '../ColumnManagerList/ColumnManager.style';
import { SearchResults } from './ColumnMangerSearchResults.styles';
import ColumnManagerItem, { Column } from '../ColumnManagerItem/ColumnManagerItem';

type Props = {
  searchResults: Column[];
  searchQuery: string;
  setFixed: (id: string, fixed?: string) => void;
  switchAction: (id: string, visible: boolean) => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};

const ColumnManagerSearchResults: React.FC<Props> = ({ searchResults, searchQuery, setFixed, switchAction, texts }) => {
  return (
    <SearchResults>
      {searchResults.length ? (
        <>
          <S.ListHeadline>Search results</S.ListHeadline>
          {searchResults.map(
            (column): React.ReactNode => (
              <ColumnManagerItem
                key={column.id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...column}
                setFixed={setFixed}
                switchAction={(): void => switchAction(column.id, column.visible)}
                searchQuery={searchQuery}
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
