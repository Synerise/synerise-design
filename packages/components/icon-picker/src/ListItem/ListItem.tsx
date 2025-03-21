import React from 'react';
import Button from '@synerise/ds-button';
import { ListItemProps } from './ListItem.types';
import * as S from '../IconPicker.styles';

const ListItem = ({ element, index, onSelect }: ListItemProps) => {
  const selectIcon = (): void => {
    onSelect(element.item);
  };

  return (
    <S.ListItem>
      {typeof element.item !== 'string' && (element.item as any).type.name === 'Avatar' ? ( // eslint-disable-line
        <S.IconTrigger onMouseUp={selectIcon} data-testid={`icon${index}`}>
          {element.item}
        </S.IconTrigger>
      ) : (
        <Button type="ghost" mode="single-icon">
          <S.IconTrigger onMouseUp={selectIcon} data-testid={`icon${index}`}>
            <div className="icon-wrapper">
              {typeof element.item === 'string' ? <S.FontIcon>{element.item}</S.FontIcon> : element.item}
            </div>
          </S.IconTrigger>
        </Button>
      )}
    </S.ListItem>
  );
};

export default ListItem;
