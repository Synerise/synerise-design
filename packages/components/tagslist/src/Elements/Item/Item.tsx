import * as React from 'react';
import Highlighter from 'react-highlight-words';

import Icon from '@synerise/ds-icon';
import Checkbox from '@synerise/ds-checkbox';
import { TagM, TagStarredM, TagStarredFlatM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside, sNOOPy } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';

import { validateFolderName } from '../../utils';
import useTagsListContext from '../../useTagsListContext';
import Actions from '../Actions';
import { ItemProps } from './Item.types';

import * as S from './Item.styles';

function getRenderItemName(itemName: string, query: string): React.ReactElement {
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
}

const Item: React.FC<ItemProps> = ({
  item,
  onSettingsEnter,
  onDelete = sNOOPy,
  onFavourite = sNOOPy,
  onVisibility = sNOOPy,
  onEdit,
  texts,
  onItemSelect = sNOOPy,
  checked = false,
  withCheckbox = true,
  rootPrefixCls,
}) => {
  const { name, favourite } = item;
  const { searchQuery } = useTagsListContext();

  const [dropdownOpened, setDropdownOpened] = React.useState<boolean>(false);
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [itemName, setItemName] = React.useState<string>(name);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [overflowed, setOverflowed] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  const renderItemName = getRenderItemName(itemName, searchQuery);

  const confirmEdit = React.useCallback((): void => {
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

  React.useEffect(() => {
    setItemName(name);
    // Check if is overflowed
    if (textRef.current && textRef.current?.offsetWidth < textRef.current?.scrollWidth) {
      setOverflowed(true);
    }
  }, [name, textRef]);

  const getPrefix = React.useCallback((isFavourite, isHovered, isEditMode): React.ReactNode => {
    if (isFavourite) {
      return isHovered || isEditMode ? <TagStarredFlatM /> : <TagStarredM />;
    }
    return <TagM />;
  }, []);

  React.useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);

  const onMouseOver = (): void => {
    setHovered(true);
  };

  const onMouseOut = (): void => {
    setHovered(false);
  };

  const handleOnFavourite = (): void => {
    onFavourite(item);
  };

  const handleOnEdit =
    onEdit &&
    ((): void => {
      setEditMode(true);
    });

  const onDropdown = (opened: boolean): void => {
    setDropdownOpened(opened);
  };

  const renderSuffix = (): React.ReactNode => (
    <Actions
      onDelete={onDelete}
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

  const onClick = (): void => {
    onItemSelect(item);
  };

  const isHovered = !!(hovered || dropdownOpened);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.TagsListItem
      editMode={editMode}
      onClick={onClick}
      active={checked}
      hovered={isHovered}
      rootPrefixCls={rootPrefixCls}
      prefixel={
        <S.PrefixWrapper>
          {withCheckbox && (isHovered || checked || editMode) ? (
            <Checkbox checked={checked} />
          ) : (
            <Icon
              component={getPrefix(favourite, isHovered, editMode)}
              color={isHovered || editMode ? theme.palette['blue-600'] : theme.palette['grey-600']}
            />
          )}
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
            ) : (
              renderItemName
            )}
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
