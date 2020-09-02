import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';
import { useOnClickOutside } from '@synerise/ds-utils';
import { SubjectItem, SubjectListProps } from '../Subject.types';
import * as S from './SubjectList.styles';
import SubjectListItem from './SubjectListItem';

const SubjectList: React.FC<SubjectListProps> = ({ items, selectItem, hideDropdown, texts }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(overlayRef, () => {
    hideDropdown();
  });

  const renderItems = React.useMemo(() => {
    return items
      .filter((item: SubjectItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item: SubjectItem) => {
        return (
          <SubjectListItem
            searchQuery={searchQuery}
            key={`${item.name}-${item.id}`}
            select={selectItem}
            hideDropdown={hideDropdown}
            clearSearch={(): void => setSearchQuery('')}
            item={item}
          />
        );
      });
  }, [items, searchQuery, hideDropdown, selectItem, setSearchQuery]);

  return (
    <Dropdown.Wrapper ref={overlayRef}>
      <Dropdown.SearchInput
        onSearchChange={setSearchQuery}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
        onClearInput={(): void => setSearchQuery('')}
      />
      <S.ItemsList>
        <Scrollbar absolute maxHeight={300}>
          {renderItems.length ? (
            renderItems
          ) : (
            <Result noSearchResults type="no-results" description={texts.noResults} />
          )}
        </Scrollbar>
      </S.ItemsList>
    </Dropdown.Wrapper>
  );
};

export default SubjectList;
