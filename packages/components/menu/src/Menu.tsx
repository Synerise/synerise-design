import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Menu.styles';

import { TextItem } from './Elements';
import SubMenuItem from './Elements/SubMenu/SubMenu';
import { AntdMenuProps, AntdMenuState } from './Menu.types';
import MenuItem from './Elements/Item/MenuItem';
import { MenuItemProps } from './Elements/Item/MenuItem.types';

class Menu extends React.Component<AntdMenuProps, AntdMenuState> {
  static Item: typeof TextItem = TextItem;
  private virtualize = this.shouldVirtualizeItems();

  // eslint-disable-next-line react/destructuring-assignment
  state: AntdMenuState = { toRender: this.props.dataSource, itemsCountToShow: 7 }; // hardcoded - needs to be calculated in constructor

  handleScroll = (e: any): void => {
    const { dataLength, rowHeight } = this.props;
    const element = e.target;
    const { itemsCountToShow } = this.state;
    const lastVisibleElement = Math.floor(element.scrollHeight / rowHeight);
    if (itemsCountToShow < dataLength && element.scrollHeight > (lastVisibleElement - 1) * rowHeight) {
      // eslint-disable-next-line no-console
      console.log('Top level menu State changed', this.state);
      this.setState((prevState: AntdMenuState) => ({ ...prevState, itemsCountToShow: prevState.itemsCountToShow + 1 }));
    }
  };

  shouldVirtualizeItems(): boolean {
    const { virtualized, rowHeight, height, dataLength } = this.props;
    return !!virtualized && !!rowHeight && !!height && !!dataLength;
  }

  prepareDataForRender(items: MenuItemProps[]): MenuItemProps[] {
    if (this.virtualize) {
      const { itemsCountToShow } = this.state;
      if (itemsCountToShow !== undefined && itemsCountToShow > 0) {
        return items.slice(0, itemsCountToShow);
      }
    }
    return items;
  }

  render(): React.ReactNode {
    const { dataSource, dataLength, ordered, height, rowHeight, virtualized, ...rest } = this.props;
    return (
      <>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <S.AntdMenu
          ordered={ordered}
          mode="inline"
          inlineIndent={24}
          {...rest}
          height={height}
          onScroll={(e): void => this.handleScroll(e)}
        >
          {dataSource.map(items =>
            this.prepareDataForRender(items).map((item: MenuItemProps, index: number) =>
              item.subMenu ? (
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
                  ordered={ordered}
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
                  ordered={ordered}
                  copyable={item.copyable}
                  copyHint={item.copyHint}
                  copyValue={item.copyValue}
                  show
                  key={`${item.text}${index}`} // eslint-disable-line react/no-array-index-key
                  {...rest}
                />
              )
            )
          )}
        </S.AntdMenu>
      </>
    );
  }
}

export default Menu;
