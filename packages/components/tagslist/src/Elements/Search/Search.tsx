import * as React from 'react';

import { NOOP } from '@synerise/ds-utils';
import { SearchInput } from '@synerise/ds-search/dist/Elements';

import useTagsListContext from '../../useTagsListContext';
import * as S from './Search.styles';

const Search: React.FC = () => {
  const {
    searchQuery = '', 
    setSearchQuery = NOOP,
    setSearchOpen = NOOP,
  } = useTagsListContext();

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