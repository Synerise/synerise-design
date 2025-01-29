import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Icon, { SearchM } from '@synerise/ds-icon';
import { v4 as uuid } from 'uuid';
import { SubjectItem, SubjectListProps } from '../Subject.types';
import * as S from './SubjectList.styles';
import SubjectListItem from './SubjectListItem';

const SubjectList: React.FC<SubjectListProps> = ({ items, onSelectItem, hideDropdown, texts }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);
  const classNames = React.useMemo(() => {
    return `ds-subject-item ds-subject-item-${uuid()}`;
  }, []);

  useOnClickOutside(overlayRef, () => {
    hideDropdown();
  });

  const renderItems = React.useMemo(() => {
    return items
      .filter((item: SubjectItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item: SubjectItem) => {
        return (
          <SubjectListItem
            className={classNames}
            searchQuery={searchQuery}
            key={`${item.name}-${item.id}`}
            select={onSelectItem}
            hideDropdown={hideDropdown}
            clearSearch={(): void => setSearchQuery('')}
            item={item}
          />
        );
      });
  }, [items, searchQuery, hideDropdown, onSelectItem, setSearchQuery, classNames]);

  return (
    <Dropdown.Wrapper
      style={{ width: '300px' }}
      ref={overlayRef}
      data-testid="subject-overlay"
      onKeyDown={(e): void => {
        setSearchInputFocus(false);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        searchQuery &&
          focusWithArrowKeys(e, classNames.split(' ')[1], () => {
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
