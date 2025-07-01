import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { InfoFillS } from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import Tooltip from '@synerise/ds-tooltip';
import { escapeRegEx } from '@synerise/ds-utils';

import * as S from '../Item.styles';
import { type ItemLabelProps } from './ItemName.types';

const ItemName = ({
  item,
  onUpdate,
  editMode,
  searchQuery,
}: ItemLabelProps) => {
  const [editedName, setEditedName] = useState(item.name);

  const updateName = useCallback(() => {
    onUpdate && onUpdate({ id: item.id, name: editedName });
  }, [editedName, onUpdate, item.id]);

  const editName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  }, []);

  useEffect(() => {
    if (item.name !== editedName) {
      setEditedName(item.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const inputProps = useMemo(() => {
    return {
      name: 'list-item-name-input',
      value: editedName,
      onBlur: updateName,
      onChange: editName,
    };
  }, [editedName, updateName, editName]);

  const name = useMemo(() => {
    if (searchQuery) {
      const escapedQuery = escapeRegEx(searchQuery);
      const startOfQuery = item.name
        .toLowerCase()
        .search(escapedQuery.toLowerCase());
      const endOfQuery = startOfQuery + searchQuery.length;
      const resultArray = [
        item.name.substring(0, startOfQuery),
        <span key={item.id} className="search-highlight">
          {item.name.substring(startOfQuery, endOfQuery)}
        </span>,
        item.name.substring(endOfQuery, item.name.length),
      ];

      return resultArray;
    }
    return item.name;
  }, [item.id, item.name, searchQuery]);

  const classes = item.nameWrapperClassNames?.length
    ? ['title', ...item.nameWrapperClassNames]
    : ['title'];

  return (
    <S.ItemLabelWrapper
      data-testid={item.description && 'item-description-icon'}
    >
      {editMode ? (
        <InlineEdit
          size="small"
          hideIcon
          style={{ maxWidth: '100%', lineHeight: '24px' }}
          input={inputProps}
          data-testid="list-item-name-input"
          autoFocus
        />
      ) : (
        <S.ItemLabelWithIcon>
          <S.ItemLabel
            data-testid="list-item-name"
            className={classes.join(' ')}
          >
            {name}
          </S.ItemLabel>
          {item.description && (
            <Tooltip
              description={item.description}
              placement="top"
              trigger="hover"
              type="largeSimple"
            >
              <span>
                <S.DescriptionIcon component={<InfoFillS />} color="#b5bdc3" />
              </span>
            </Tooltip>
          )}
          {item.tags && <S.ItemTagList>{item.tags}</S.ItemTagList>}
        </S.ItemLabelWithIcon>
      )}
    </S.ItemLabelWrapper>
  );
};

export default ItemName;
