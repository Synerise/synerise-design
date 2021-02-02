import * as React from 'react';

import { SearchInput } from '@synerise/ds-search/dist/Elements';

import TagsListContext from '../../TagsListContext';
import * as S from './Search.styles';

const NOOP = () => {};

const Search: React.FC = () => {
  const {
    searchQuery = '', 
    setSearchQuery = NOOP,
    setSearchOpen = NOOP,
  } = React.useContext(TagsListContext) || {};

  const inputRef = React.useRef(null);

  const onChange = (query: string) => { setSearchQuery(query); };

  return (
    <S.SearchContainer ref={inputRef}>
      <SearchInput
        onChange={onChange} 
        value={searchQuery || ''}
        closeOnClickOutside
        onToggle={(isOpen: boolean) => {
          setSearchOpen(isOpen);
        }}
        onClear={() => { 
          setSearchQuery('');
        }}
      />
    </S.SearchContainer>
  )
}

export default Search;