import * as React from 'react';
import Highlighter from 'react-highlight-words';

import Icon from '@synerise/ds-icon';
import Checkbox from '@synerise/ds-checkbox';
import { TagM, TagStarredM, TagStarredFlatM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';

import { ClickParam } from 'antd/lib/menu';
import { validateFolderName } from '../../utils';
import TagsListContext from '../../TagsListContext';
import Actions from '../Actions';
import { ItemProps } from './Item.types';

import * as S from './Item.styles';

const { useEffect, useState, useCallback, useRef } = React;

const NOOP = () => {};

function getRenderItemName(itemName: string, query: string ): React.ReactNode {
  if(query && itemName.toLowerCase().match(query.toLowerCase())) {
    return <Highlighter 
      searchWords={[query]}
      highlightClassName="highlight"
      unhighlightClassName="unhighlight"
      textToHighlight={itemName}
    />
  }
  return itemName;
}

const Item: React.FC<ItemProps> = ({
  item,
  onSettingsEnter,
  onDelete,
  onFavourite,
  onVisibility,
  onEdit,
  toggleDeleteModal,
  texts,
  onItemSelect = NOOP,
  checked = false,
  withCheckbox = true
}: ItemProps) => {
  const { name, favourite } = item;
  const { searchQuery } = React.useContext(TagsListContext);
  
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>(name);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [overflowed, setOverflowed] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const renderItemName = getRenderItemName(itemName, searchQuery);

  const confirmEdit = useCallback((): void => {
    if (validateFolderName(itemName)) {
      const trimmedName = itemName.trim();
      onEdit && onEdit({ ...item, name: trimmedName });
      setEditMode(false);
    } else {
      onEdit && onEdit({ ...item, name });
      setItemName(name);
      setEditMode(false);
    }
  }, [itemName, name, item, onEdit]);

  useEffect(() => {
    setItemName(name);
    // Check if is overflowed
    if(textRef.current && textRef.current?.offsetWidth < textRef.current?.scrollWidth) {
      setOverflowed(true);
    }
  }, [name]);

  const getPrefix = useCallback((isFavourite, isHovered, isEditMode): React.ReactNode => {
    if (isFavourite) {
      return isHovered || isEditMode ? <TagStarredFlatM /> : <TagStarredM />;
    }
    return <TagM />;
  }, []);

  useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);

  const onMouseOver = (): void => {
    setHovered(true);
  };

  const onMouseOut = (): void => {
    setHovered(false);
  };

  const handleOnFavourite = (): void => {
    onFavourite && onFavourite(item);
  };

  const handleOnEdit = onEdit && ((): void => {
    setEditMode(true);
  });

  const onDropdown = (opened: boolean) => {
    setDropdownOpened(opened);
  };

  const renderSuffix = (): React.ReactNode => (
    <Actions
      onDelete={
        onDelete &&
        ((): void => {
          toggleDeleteModal && toggleDeleteModal();
        })
      }
      item={item}
      onVisibility={onVisibility}
      onDropdown={onDropdown}
      visibility={item.visibility}
      onFavourite={handleOnFavourite}
      onSettingsEnter={onSettingsEnter}
      onEdit={handleOnEdit}
      isFavourite={favourite}
      texts={texts}
    />
  );

  useOnClickOutside(inputRef, () => {
    if (editMode) {
      confirmEdit();
    }
  });

  const onClick = (params: ClickParam): void => {
    console.log(item);
    onItemSelect && onItemSelect(item);
  };

  const isHovered = hovered || dropdownOpened;

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.TagsListItem
      editMode={editMode}
      onClick={onClick}
      hovered={isHovered}
      prefixel={
        <S.PrefixWrapper>
          {withCheckbox && (isHovered || checked || editMode) ? 
            <Checkbox 
              checked={checked}
            /> :
            <Icon
              component={getPrefix(favourite, isHovered, editMode)}
              color={isHovered || editMode ? theme.palette['blue-600'] : theme.palette['grey-600']}
            />
          }
        </S.PrefixWrapper>
      }
      suffixel={
        <S.SuffixWrapper className={isHovered ? 'suffix-wrapper-hovered' : undefined}>{renderSuffix()}</S.SuffixWrapper>
      }
      text={
        editMode ? (
          <S.InlineEditWrapper>
            <S.InlineEditInput
              value={itemName}
              onChange={(e: React.SyntheticEvent<HTMLInputElement>): void => setItemName(e.currentTarget.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
                if (e.key === 'Enter') {
                  confirmEdit();
                }
              }}
              ref={inputRef}
            />
          </S.InlineEditWrapper>
        ) : (
          <S.TagsListText ref={textRef}>
            {overflowed ? (
              <Tooltip placement="topLeft" title={itemName}>
                {renderItemName}
              </Tooltip>
            ) : renderItemName}
          </S.TagsListText>
        )
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onMouseLeave={onMouseOut}
      onMouseEnter={onMouseOver}
    />
  );
};

export default Item;
