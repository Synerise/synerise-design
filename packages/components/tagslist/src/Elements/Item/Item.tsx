import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Checkbox from '@synerise/ds-checkbox';
import { TagM, TagStarredM, TagStarredFlatM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';
import { ItemProps } from './Item.types';
import * as S from './Item.styles';
import ActionsDropdown from '../Actions/Dropdown/ActionsDropdown';
import ActionsRow from '../Actions/Row/ActionsRow';
import { validateFolderName } from '../../utils';

const { useEffect, useState, useCallback, useRef } = React;

const Item: React.FC<ItemProps> = ({
  item,
  actionsDisplay,
  onSettingsEnter,
  onDelete,
  onFavourite,
  onEdit,
  toggleDeleteModal,
  texts,
  onItemSelect,
  checked = false,
  withCheckbox = true,
  icon,
  iconFavourite,
  iconFavouriteFlat
}: ItemProps) => {
  const { name, favourite } = item;
  const [hovered, setHovered] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(name);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(checked);
  const [overflowed, setOverflowed] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number>(0);
  const textRef = useRef<HTMLDivElement>(null);

  const confirmEdit = useCallback((): void => {
    if (validateFolderName(folderName)) {
      const trimmedName = folderName.trim();
      onEdit && onEdit({ ...item, name: trimmedName });
      setEditMode(false);
    } else {
      onEdit && onEdit({ ...item, name });
      setFolderName(name);
      setEditMode(false);
    }
  }, [folderName, name, item, onEdit]);

  useEffect(() => {
    setFolderName(name);
    // Check if is overflowed
    if(textRef.current && textRef.current?.offsetWidth < textRef.current?.scrollWidth) {
      setOverflowed(true);
    }
  }, [name]);

  // Change checked state if prop changes
  useEffect(() => {
    if(isChecked !== checked) setChecked(checked);
  }, [checked, setChecked]);

  const getPrefix = useCallback((isFavourite, isHovered, isEditMode): React.ReactNode => {
    if (isFavourite) {
      return isHovered || isEditMode ? <TagStarredFlatM /> : <TagStarredM />;
    }
    return <TagM />;
  }, []);

  useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);

  const onMouseOver = useCallback((): void => {
    clearTimeout(timeoutRef.current);
    if(!hovered) setHovered(true);
  }, [hovered, setHovered, timeoutRef]);

  const onMouseOut = useCallback((): void => {
    timeoutRef.current = setTimeout(() => setHovered(false), 10);
  }, [hovered, setHovered, timeoutRef]);

  const handleOnFavourite = useCallback((): void => {
    onFavourite && onFavourite(item);
  }, [onFavourite, item]);

  const renderSuffix = (): React.ReactNode => {
    return actionsDisplay === 'inline' ? (
      <ActionsRow
        onDelete={
          onDelete &&
          ((): void => {
            toggleDeleteModal && toggleDeleteModal();
          })
        }
        onFavourite={(): void => {
          setHovered(false);
          handleOnFavourite && handleOnFavourite();
        }}
        onSettingsEnter={onSettingsEnter}
        onEdit={
          onEdit &&
          ((): void => {
            setEditMode(true);
          })
        }
        isFavourite={favourite}
        texts={texts}
        hovered={hovered}
      />
    ) : (
      <ActionsDropdown
        onDelete={
          onDelete &&
          ((): void => {
            toggleDeleteModal && toggleDeleteModal();
          })
        }
        onFavourite={handleOnFavourite}
        onSettingsEnter={onSettingsEnter}
        onEdit={
          onEdit &&
          ((): void => {
            setEditMode(true);
          })
        }
        isFavourite={favourite}
        texts={texts}
      />
    );
  };
  useOnClickOutside(inputRef, () => {
    if (editMode) {
      confirmEdit();
    }
  });

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.TagsListItem
      editMode={editMode}
      onClick={(): void => {
        if(typeof checked === 'undefined') setChecked(!isChecked);
        onItemSelect && onItemSelect(item);
      }}
      prefixel={
        <S.PrefixWrapper>
          {withCheckbox && (hovered || isChecked) ? 
            <Checkbox 
              checked={isChecked}
            /> :
            <Icon
              component={getPrefix(favourite, hovered, editMode)}
              color={hovered || editMode ? theme.palette['blue-600'] : theme.palette['grey-600']}
            />
          }
          
        </S.PrefixWrapper>
      }
      suffixel={
        <S.SuffixWrapper className={hovered ? 'suffix-wrapper-hovered' : undefined}>{renderSuffix()}</S.SuffixWrapper>
      }
      text={
        editMode ? (
          <S.InlineEditWrapper>
            <S.InlineEditInput
              value={folderName}
              onChange={(e: React.SyntheticEvent<HTMLInputElement>): void => setFolderName(e.currentTarget.value)}
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
              <Tooltip placement="topLeft" title={folderName}>
                {folderName}{' '}
              </Tooltip>
            ) : folderName}
          </S.TagsListText>
        )
      }
      inline={actionsDisplay === 'inline'}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    />
  );
};

export default Item;
