import * as React from 'react';
import * as S from './Item.styles';
import { ListProps, OrderedListItem } from '../../Ordered-list.types';
import OrderedList from '../../Ordered-list';

const Item: React.FC<OrderedListItem & Pick<ListProps, 'indexFormatter'>> = ({
  label,
  suffixel,
  prefixel,
  subMenu,
  indexFormatter,
  index,
  listStyle
}) => {
  return (
    <>
      <S.ItemWrapper listStyle={listStyle}>
        <div>{indexFormatter ? indexFormatter(index) : index}</div>
        {prefixel}
        {label}
        {suffixel}
      </S.ItemWrapper>
      {!!subMenu && subMenu?.length > 0 && <OrderedList indexFormatter={indexFormatter} data={subMenu} />}
    </>
  );
};

export default React.memo(Item);
