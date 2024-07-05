import React, { SyntheticEvent, useCallback, useEffect, useRef, useState, KeyboardEvent, useMemo } from 'react';
import Highlighter from 'react-highlight-words';

import Checkbox from '@synerise/ds-checkbox';
import { TagM, TagStarredM } from '@synerise/ds-icon';
import { useOnClickOutside, NOOP } from '@synerise/ds-utils';

import { validateFolderName } from '../../utils';
import useTagsListContext from '../../useTagsListContext';
import Actions from '../Actions';
import { ItemProps } from './Item.types';

import * as S from './Item.styles';

const ItemName = ({ itemName, query }: { itemName: string; query: string }) => {
  if (query && itemName.toLowerCase().match(query.toLowerCase())) {
    return (
      <Highlighter
        searchWords={[query]}
        highlightClassName="highlight"
        unhighlightClassName="unhighlight"
        textToHighlight={itemName}
      />
    );
  }
  return <span>{itemName}</span>;
};

const Item = ({
  item,
  onSettingsEnter,
  onDelete = NOOP,
  onFavouriteChange = NOOP,
  onVisibilityChange = NOOP,
  onEdit,
  texts,
  onItemSelect = NOOP,
  checked = false,
  withCheckbox = true,
  rootPrefixCls,
}: ItemProps) => {
  const { name, favourite } = item;
  const { searchQuery } = useTagsListContext();

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [itemName, setItemName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const confirmEdit = useCallback(() => {
    if (validateFolderName(itemName)) {
      const trimmedName = itemName.trim();
      onEdit && onEdit({ ...item, name: trimmedName });
    } else {
      onEdit && onEdit({ ...item, name });
      setItemName(name);
    }
    setEditMode(false);
  }, [itemName, name, item, onEdit]);

  useEffect(() => {
    setItemName(name);
  }, [name]);

  useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  const handleOnFavouriteChange = () => {
    onFavouriteChange(item);
  };

  const handleOnEdit =
    onEdit &&
    (() => {
      setEditMode(true);
    });

  const onDropdownToggle = (opened: boolean) => {
    setDropdownOpened(opened);
  };

  useOnClickOutside(inputRef, () => {
    if (editMode) {
      confirmEdit();
    }
  });

  const onClick = () => {
    onItemSelect(item);
  };

  const isHovered = !!(hovered || dropdownOpened);

  const prefixel = useMemo(
    () => (
      <S.PrefixWrapper favourite={favourite}>
        {withCheckbox && <Checkbox checked={checked} />}
        {favourite ? <S.TagIconFav component={<TagStarredM />} /> : <S.TagIcon component={<TagM />} />}
      </S.PrefixWrapper>
    ),
    [checked, withCheckbox, favourite]
  );

  const suffixel = (
    <S.SuffixWrapper className={isHovered ? 'suffix-wrapper-hovered' : undefined}>
      <Actions
        onDelete={onDelete}
        item={item}
        visible={dropdownOpened}
        onVisibilityChange={onVisibilityChange}
        onDropdownToggle={onDropdownToggle}
        onFavouriteChange={handleOnFavouriteChange}
        onSettingsEnter={onSettingsEnter}
        onEdit={handleOnEdit}
        texts={texts}
      />
    </S.SuffixWrapper>
  );

  const className = checked || editMode || isHovered ? `${rootPrefixCls}-item-selected` : '';

  const textComponent = useMemo(() => {
    const inlineOnChange = (event: SyntheticEvent<HTMLInputElement>) => setItemName(event.currentTarget.value);
    const inlineOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        confirmEdit();
      }
    };

    return editMode ? (
      <S.InlineEditWrapper>
        <S.InlineEditInput value={itemName} onChange={inlineOnChange} onKeyDown={inlineOnKeyDown} ref={inputRef} />
      </S.InlineEditWrapper>
    ) : (
      <S.TagsListText ellipsis={{ tooltip: itemName }}>
        <ItemName itemName={itemName} query={searchQuery} />
      </S.TagsListText>
    );
  }, [editMode, itemName, confirmEdit, inputRef, searchQuery]);

  return (
    <S.TagsListItem
      selected={checked}
      editMode={editMode}
      onClick={onClick}
      className={className}
      hovered={isHovered}
      rootPrefixCls={rootPrefixCls}
      prefixel={prefixel}
      withCheckbox={withCheckbox}
      suffixel={suffixel}
      text={textComponent}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default Item;
