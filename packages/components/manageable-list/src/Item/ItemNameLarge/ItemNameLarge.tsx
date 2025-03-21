import React from 'react';

import * as S from '../Item.styles';
import { ItemNameLargeProps } from './ItemNameLarge.types';

const ItemNameLarge = ({ item }: ItemNameLargeProps) => {
  const classes = item.nameWrapperClassNames?.length ? ['title', ...item.nameWrapperClassNames] : ['title'];

  return (
    <S.ItemLabelWrapper largeSize>
      <S.ItemLabelTop>
        <S.ItemLabel data-testid="list-item-name" className={classes.join(' ')}>
          {item.name}
        </S.ItemLabel>
        {item.uniqueKey && <S.ItemUniqueKey>{item.uniqueKey}</S.ItemUniqueKey>}
        {item.tags && <S.ItemTagList>{item.tags}</S.ItemTagList>}
      </S.ItemLabelTop>

      {item.description && <S.ItemDescription>{item.description}</S.ItemDescription>}
    </S.ItemLabelWrapper>
  );
};

export default ItemNameLarge;
