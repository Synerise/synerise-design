import * as React from 'react';

import { SearchInput } from '@synerise/ds-search/dist/Elements';

import TagsListContext from '../../TagsListContext';
import * as S from './Search.styles';

const NOOP = () => {};

const Search: React.FC = () => {
  const {
    searchOpen = false,
    searchQuery = '', 
    setSearchQuery = NOOP,
    setSearchOpen = NOOP,
  } = React.useContext(TagsListContext) || {};

  return (
    <S.SearchContainer>
      <SearchInput
        onChange={(query: string) => { setSearchQuery(query); }} 
        value={searchQuery || ''}
        onClear={() => { 
          setSearchQuery('');
        }} 
        onButtonClick={() => { 
          searchOpen && setSearchQuery('');
          setSearchOpen(!searchOpen);
        }}
      />
    </S.SearchContainer>
  )
}

export default Search;