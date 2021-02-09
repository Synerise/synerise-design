import * as React from 'react';
import Highlighter from 'react-highlight-words';

import Checkbox from '@synerise/ds-checkbox';
import { TagM, TagStarredM } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside, NOOP } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';

import { validateFolderName } from '../../utils';
import useTagsListContext from '../../useTagsListContext';
import Actions from '../Actions';
import { ItemProps } from './Item.types';

import * as S from './Item.styles';

const ItemName: React.FC<{ itemName: string; query: string }> = ({ itemName, query }) => {
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

const Item: React.FC<ItemProps> = ({
  item,
  onSettingsEnter,
  onDelete = NOOP,
  onFavourite = NOOP,
  onVisibility = NOOP,
  onEdit,
  texts,
  onItemSelect = NOOP,
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

  const renderItemName = <ItemName itemName={itemName} query={searchQuery} />;

  const confirmEdit = React.useCallback((): void => {
    if (validateFolderName(itemName)) {
      const trimmedName = itemName.trim();
      onEdit && onEdit({ ...item, name: trimmedName });
    } else {
      onEdit && onEdit({ ...item, name });
      setItemName(name);
    }
    setEditMode(false);
  }, [itemName, name, item, onEdit]);

  React.useEffect(() => {
    setItemName(name);
    // Check if is overflowed
    if (textRef.current && textRef.current?.offsetWidth < textRef.current?.scrollWidth) {
      setOverflowed(true);
    }
  }, [name, textRef]);

  React.useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);

  const onMouseEnter = (): void => {
    setHovered(true);
  };

  const onMouseLeave = (): void => {
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

  useOnClickOutside(inputRef, () => {
    if (editMode) {
      confirmEdit();
    }
  });

  const onClick = (): void => {
    onItemSelect(item);
  };

  const isHovered = !!(hovered || dropdownOpened);

  const prefixel = React.useMemo(
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
        onVisibility={onVisibility}
        onDropdown={onDropdown}
        visibility={item.visibility}
        onFavourite={handleOnFavourite}
        onSettingsEnter={onSettingsEnter}
        onEdit={handleOnEdit}
        isFavourite={favourite}
        texts={texts}
      />
    </S.SuffixWrapper>
  );

  const className = checked || editMode || isHovered ? `${rootPrefixCls}-item-selected` : '';

  const textComponent = React.useMemo(() => {
    const inlineOnChange = (e: React.SyntheticEvent<HTMLInputElement>): void => setItemName(e.currentTarget.value);
    const inlineOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        confirmEdit();
      }
    };

    return editMode ? (
      <S.InlineEditWrapper>
        <S.InlineEditInput value={itemName} onChange={inlineOnChange} onKeyDown={inlineOnKeyDown} ref={inputRef} />
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
    );
  }, [editMode, itemName, confirmEdit, inputRef, textRef, overflowed, renderItemName]);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.TagsListItem
      editMode={editMode}
      onClick={onClick}
      className={className}
      hovered={isHovered}
      rootPrefixCls={rootPrefixCls}
      prefixel={prefixel}
      withCheckbox={withCheckbox}
      suffixel={suffixel}
      text={textComponent}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: because onMouseLeave is not there :P just for clearance onMouseOut does the same
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default Item;
