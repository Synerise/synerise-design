import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { List } from 'react-virtualized';
import * as S from './Menu.styles';
import { TextItem } from './Elements';
import SubMenuItem from './Elements/SubMenu/SubMenu';
import { AntdMenuProps } from './Menu.types';
import MenuItem from './Elements/Item/MenuItem';

class Menu extends React.Component<AntdMenuProps> {
  static Item: typeof TextItem = TextItem;

  // contactRenderer = (list: any, rest: any): any => ({index,key,style,}: {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contactRenderer = (list: any, rest: any): any => ({
    index,
  }: {
    index: number;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }): any => {
    console.log(list);
    const item = list[index];
    return item.subMenu ? (
      <SubMenuItem
        parent={item.parent}
        danger={item.danger}
        prefixel={item.prefixel}
        suffixel={item.suffixel}
        disabled={item.disabled}
        index={item.index}
        text={item.text}
        description={item.description}
        subMenu={item.subMenu}
        copyable={item.copyable}
        copyHint={item.copyHint}
        copyValue={item.copyValue}
        key={`${item.text}${index}`} // eslint-disable-line react/no-array-index-key
        {...rest}
      />
    ) : (
      <MenuItem
        parent={item.parent}
        danger={item.danger}
        prefixel={item.prefixel}
        suffixel={item.suffixel}
        disabled={item.disabled}
        index={item.index}
        text={item.text}
        description={item.description}
        subMenu={item.subMenu}
        copyable={item.copyable}
        copyHint={item.copyHint}
        copyValue={item.copyValue}
        key={`${item.text}${index}`} // eslint-disable-line react/no-array-index-key
        {...rest}
      />
    );
  };

  render(): React.ReactNode {
    const { dataSource, dataLength, ordered, height, rowHeight, virtualized, ...rest } = this.props;
    return (
      <>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <S.AntdMenu ordered={ordered} mode="inline" inlineIndent={24} {...rest} height={height}>
          {dataSource.map(items => (
            // eslint-disable-next-line react/jsx-key
            <List
              width={200}
              height={items.length < 10 ? items.length * 32 : 200}
              rowCount={items.length}
              rowHeight={32}
              rowRenderer={this.contactRenderer(items, { ...rest })}
            />
          ))}
        </S.AntdMenu>
      </>
    );
  }
}

export default Menu;
