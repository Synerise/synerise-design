import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Icon from '@synerise/ds-icon';
import { SearchM } from '@synerise/ds-icon/dist/icons';
import { SubjectItem, SubjectListProps } from '../Subject.types';
import * as S from './SubjectList.styles';
import SubjectListItem from './SubjectListItem';

const SubjectList: React.FC<SubjectListProps> = ({ items, selectItem, hideDropdown, texts }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);

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
    <Dropdown.Wrapper
      ref={overlayRef}
      onKeyDown={(e): void => {
        setSearchInputFocus(false);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        searchQuery &&
          focusWithArrowKeys(e, 'ds-subject-item', () => {
            setSearchInputFocus(true);
          });
      }}
    >
      <Dropdown.SearchInput
        autofocus={!searchQuery || searchInputCanBeFocused}
        iconLeft={<Icon component={<SearchM />} />}
        onSearchChange={setSearchQuery}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
        onClearInput={(): void => setSearchQuery('')}
      />
      <S.ItemsList>
        <Scrollbar style={{ padding: 8 }} absolute maxHeight={300}>
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
