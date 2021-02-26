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
  listStyle,
  subMenuProps,
  text,
}) => {
  return (
    <>
      <S.ItemWrapper >
        <S.IndexFormatterWrapper >
          {indexFormatter ? indexFormatter(index) : index}
        </S.IndexFormatterWrapper>
        {prefixel}
        {label}
        {suffixel}
      </S.ItemWrapper>
      {!!subMenu && subMenu?.length > 0 && (
        <OrderedList text={text} indexFormatter={indexFormatter} data={subMenu} listStyle={listStyle} {...subMenuProps} />
      )}
    </>
  );
};

export default React.memo(Item);
