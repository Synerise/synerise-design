import React from 'react';

import Button from '@synerise/ds-button';

import * as S from '../../IconPicker.styles';
import { type SourceType } from '../../IconPicker.types';
import { type ListItemProps } from './ListItem.types';

const ListItem = <Source extends SourceType>({
  element,
  index,
  onSelect,
  itemsPerRow,
}: ListItemProps<Source>) => {
  const selectIcon = () => {
    onSelect(element.value);
  };
  return (
    <S.ListItem itemsPerRow={itemsPerRow}>
      {typeof element.item !== 'string' &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (element.item as any).type.name === 'Avatar' ? (
        <S.IconTrigger onMouseUp={selectIcon} data-testid={`icon-${index}`}>
          {element.item}
        </S.IconTrigger>
      ) : (
        <Button type="ghost" mode="single-icon" onClick={selectIcon}>
          <S.IconTrigger data-testid={`icon-${index}`}>
            <div className="icon-wrapper">
              {typeof element.item === 'string' ? (
                <S.FontIcon>{element.item}</S.FontIcon>
              ) : (
                element.item
              )}
            </div>
          </S.IconTrigger>
        </Button>
      )}
    </S.ListItem>
  );
};

export default ListItem;
