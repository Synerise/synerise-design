import React, { Children } from 'react';

import CardSelect from '../CardSelect';
import * as S from './CardSelectGroup.styles';
import { type CardSelectGroupProps } from './CardSelectGroup.types';

const DEFAULT_COLUMNS = 2;
const DEFAULT_SIZE = 'large';

const CardSelectGroup = ({
  className,
  children,
  items,
  size,
  width = DEFAULT_SIZE,
  columns = DEFAULT_COLUMNS,
}: CardSelectGroupProps) => {
  const cardsCount = items?.length || Children.toArray(children).length;
  return (
    <S.CardSelectGroupWrapper
      className={className}
      size={size || width}
      columns={columns}
      itemsCount={cardsCount}
    >
      {items
        ? items.map((item) => (
            <CardSelect {...item} key={item.key} size={size || item.size} />
          ))
        : children}
    </S.CardSelectGroupWrapper>
  );
};

export default CardSelectGroup;
