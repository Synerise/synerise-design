import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Icon, { Settings2M, SearchM, Add3M } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import ListItem from '@synerise/ds-list-item';
import SearchBar from '@synerise/ds-search-bar';
import Checkbox from '@synerise/ds-checkbox';
import CheckboxTristate from '@synerise/ds-checkbox-tristate';
import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';
import { useOnClickOutside, NOOP } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Result from '@synerise/ds-result';

import useTexts from '../../useTexts';
import { TagsListItem, TagVisibility } from '../../TagsList.types';
import { AddModalProps } from './AddModal.types';

import * as S from './AddModal.styles';
import { TagInfo } from './TagInfo';

const DEFAULT_NAME = '';

function getNewItem(name: string): TagsListItem {
  return {
    id: uuid(),
    name,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  };
}

const AddModal = ({
  items: propItems,
  disabled = false,
  texts: propTexts,
  tristate = false,
  loading = false,
  trigger,
  searchAddTag = true,
  onManageTags = NOOP,
  onItemsAdd = NOOP,
  onVisibleChange = NOOP,
}: AddModalProps) => {
  const CheckboxComponent = tristate ? CheckboxTristate : Checkbox;
  const [search, setSearch] = useState(DEFAULT_NAME);
  const [items, setItems] = useState(propItems || []);
  const [selectedTags, setSelectedTags] = useState({});
  const [newTagSelected, setNewTagSelected] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const texts = useTexts(propTexts);

  const selected = Object.keys(selectedTags).length || newTagSelected;

  useOnClickOutside(overlayRef, () => {
    if (overlayVisible) {
      setOverlayVisible(false);
      setSearch(DEFAULT_NAME);
    }
  });

  useEffect(() => {
    if (propItems) setItems(propItems);
  }, [propItems]);

  const handleSearchChange = (name: string) => setSearch(name);

  const handleItemsAdd = () => {
    const add = Object.keys(selectedTags).map(id => {
      const newItem = { ...items.filter(thisItem => thisItem.id === id).shift() } as TagsListItem;
      newItem.checked = selectedTags[id];
      newItem.canUpdate = newItem.canUpdate === undefined ? true : newItem.canUpdate;
      newItem.canDelete = newItem.canDelete === undefined ? true : newItem.canDelete;
      newItem.canEnterSettings = newItem.canEnterSettings === undefined ? true : newItem.canEnterSettings;
      newItem.visibility = TagVisibility.Hide;
      return newItem;
    });

    onItemsAdd(add as TagsListItem[]);
    setOverlayVisible(false);
    setSelectedTags({});
    setNewTagSelected(false);
    setSearch(DEFAULT_NAME);
  };

  const toggleInput = () => {
    setSearch(DEFAULT_NAME);
    setNewTagSelected(false);
    setSelectedTags({});
    setOverlayVisible(!overlayVisible);
  };

  const focus = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    overlayVisible && inputRef.current && inputRef.current.focus();
  };

  const renderedItems = useMemo(() => {
    const rendered = items
      .filter(item => {
        return !search ? true : item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
      .map((item: TagsListItem) => {
        const itemOnClick = () => {
          let checked: boolean | undefined = true;

          if (tristate && item.id in selectedTags && selectedTags[item.id] === undefined) {
            checked = false;
          } else if (tristate && item.id in selectedTags && selectedTags[item.id] === true) {
            checked = undefined;
          } else if (selectedTags[item.id]) {
            checked = false;
          }

          const newSelectedTags = {
            ...selectedTags,
            [item.id]: checked,
          };

          if (checked === false) delete newSelectedTags[item.id];

          setSelectedTags(newSelectedTags);
        };

        const tristateChecked = item.id in selectedTags ? selectedTags[item.id] : false;
        const thisChecked = !tristate ? selectedTags[item.id] : tristateChecked;

        return (
          <S.TagItem
            highlight={search}
            key={`${item.id}-${item.name}`}
            selected={thisChecked}
            prefixel={<CheckboxComponent checked={thisChecked} />}
            suffixel={item.description && <TagInfo info={item.description} />}
            onClick={itemOnClick}
          >
            {item.name}
          </S.TagItem>
        );
      });

    if (!rendered.length) return <Result description="No results" type="no-results" />;

    return rendered;
  }, [CheckboxComponent, items, search, selectedTags, tristate]);

  const renderAddTag = () => {
    const perfectMatch = items.filter((item): boolean => {
      return item.name.toLowerCase().trim() === search.toLowerCase().trim();
    });

    const onAddTagClick = () => {
      const newItem = getNewItem(search);
      const newItems = [newItem, ...items];
      const newSelectedTags = {
        [newItem.id]: true,
        ...selectedTags,
      };

      setItems(newItems);
      setSearch('');
      setNewTagSelected(false);
      setSelectedTags(newSelectedTags);
    };

    if (search && !perfectMatch.length) {
      return (
        <>
          <S.TagItem onClick={onAddTagClick} prefixel={<Checkbox checked={newTagSelected} />}>
            Add: {search}
          </S.TagItem>
          <ListItem type="divider" />
        </>
      );
    }

    return null;
  };

  const renderedList = loading ? (
    <S.Loader>
      <Loader color="blue" label={texts?.loading} labelPosition="bottom" size="M" />
    </S.Loader>
  ) : (
    <S.TagItems>
      {searchAddTag ? renderAddTag() : null}
      {renderedItems}
    </S.TagItems>
  );

  const onClearInput = () => {
    setSearch(DEFAULT_NAME);
  };

  return (
    <Dropdown
      overlay={
        <Dropdown.Wrapper
          data-testid="ds-tagslist-add-dropdown"
          style={{ width: 'auto', minWidth: '250px' }}
          ref={overlayRef}
        >
          <SearchBar
            placeholder="Search"
            handleInputRef={focus}
            disabled={loading}
            iconLeft={<Icon component={<SearchM />} />}
            value={search}
            onSearchChange={handleSearchChange}
            clearTooltip={texts?.searchClear || 'Clear'}
            onClearInput={onClearInput}
          />
          <Scrollbar maxHeight={176} absolute>
            {renderedList}
          </Scrollbar>
          <S.BottomAction onClickAction={NOOP}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <div style={{ flexGrow: 1 }}>
                <Button type="ghost" mode="icon-label" onClick={onManageTags}>
                  <Icon component={<Settings2M />} size={24} />
                  &nbsp;
                  {texts?.enterSettings}
                </Button>
              </div>
              {selected ? (
                <Button type="ghost-primary" onClick={handleItemsAdd}>
                  {texts?.applyAdd}
                </Button>
              ) : null}
            </div>
          </S.BottomAction>
        </Dropdown.Wrapper>
      }
      placement="bottomLeft"
      trigger={['click']}
      visible={overlayVisible}
      onVisibleChange={onVisibleChange}
    >
      {/* eslint-disable-next-line */}
      <div onClick={toggleInput}>
        {trigger || (
          <Button type="ghost" mode="icon-label" disabled={disabled}>
            <Icon component={<Add3M />} size={24} />
            {texts?.addItemLabel}
          </Button>
        )}
      </div>
    </Dropdown>
  );
};

export default AddModal;
