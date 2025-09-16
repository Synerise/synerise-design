import React, { type ReactElement } from 'react';

import {
  type OrderedListItem,
  type OrderedListProps,
} from '../../Ordered-list.types';
import * as S from './Item.styles';

const Item = ({
  label,
  suffixel,
  prefixel,
  subMenu,
  indexFormatter,
  index,
  listStyle,
  subMenuProps,
  text,
  NestedList,
}: OrderedListItem &
  Pick<OrderedListProps, 'indexFormatter'> & {
    NestedList?: (props: OrderedListProps) => ReactElement;
  }) => {
  return (
    <>
      <S.ItemWrapper>
        <S.IndexFormatterWrapper>
          {indexFormatter ? indexFormatter(index) : index}
        </S.IndexFormatterWrapper>
        {prefixel}
        {label}
        {suffixel}
      </S.ItemWrapper>
      {!!subMenu && subMenu?.length > 0 && NestedList && (
        <NestedList
          text={text}
          indexFormatter={indexFormatter}
          data={subMenu}
          listStyle={listStyle}
          {...subMenuProps}
        />
      )}
    </>
  );
};

export default React.memo(Item);
