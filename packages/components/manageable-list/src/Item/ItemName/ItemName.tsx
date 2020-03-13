import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import * as S from '../SimpleItem/SimpleItem.styles';
import { ItemProps } from '../Item';

type ItemLabelProps = {
  item: ItemProps;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  editMode: boolean;
  searchQuery?: string;
};

const ItemName: React.FC<ItemLabelProps> = ({ item, onUpdate, editMode, searchQuery }): React.ReactElement => {
  const [editedName, setName] = React.useState(item.name);

  const updateName = React.useCallback(() => {
    onUpdate && onUpdate({ id: item.id, name: editedName });
  }, [editedName, onUpdate, item.id]);

  const editName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const inputProps = React.useMemo(() => {
    return {
      name: 'list-item-name-input',
      value: editedName,
      onBlur: updateName,
      onChange: editName,
    };
  }, [editedName, updateName, editName]);

  const name = React.useMemo(() => {
    if (searchQuery) {
      const startOfQuery = item.name.toLowerCase().search(searchQuery.toLowerCase());
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

  return (
    <S.ItemLabelWrapper data-testid={item.description && 'item-description-icon'}>
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
          <S.ItemLabel data-testid="list-item-name">{name}</S.ItemLabel>
          {item.description && (
            <Tooltip description={item.description} placement="top" trigger="hover" type="largeSimple">
              <span>
                <S.DescriptionIcon component={<InfoFillS />} color="#b5bdc3" />
              </span>
            </Tooltip>
          )}
        </S.ItemLabelWithIcon>
      )}
    </S.ItemLabelWrapper>
  );
};

export default ItemName;
