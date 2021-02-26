import * as React from 'react';
import * as S from './Item.styles';
import { ListProps, UnorderedListItem } from '../../Unordered-list.types';
import UnorderedList from '../../Unordered-list';

const Item: React.FC<UnorderedListItem & Pick<ListProps, 'indexFormatter'>> = ({
  label,
  suffixel,
  prefixel,
  subMenu,
  indexFormatter,
  index,

  subMenuProps,
  text,
}) => {
  return (
    <>
      <S.ItemWrapper>
        <S.IndexFormatterWrapper>{indexFormatter ? indexFormatter(index) : index}</S.IndexFormatterWrapper>
        {prefixel}
        {label}
        {suffixel}
      </S.ItemWrapper>
      {!!subMenu && subMenu?.length > 0 && (
        <UnorderedList text={text} indexFormatter={indexFormatter} data={subMenu} {...subMenuProps} />
      )}
    </>
  );
};

export default React.memo(Item);
