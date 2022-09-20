import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import Tooltip from '@synerise/ds-tooltip';
import './style/index.less';
import * as S from './Menu.styles';

import SubMenuItem from './Elements/SubMenu/SubMenu';
import { AntdMenuProps } from './Menu.types';
import MenuItem from './Elements/Item/MenuItem';
import { MenuItemProps } from './Elements/Item/MenuItem.types';
import Breadcrumb from './Elements/Breadcrumb/Breadcrumb';
import Header from './Elements/Header/Header';

class Menu extends React.Component<AntdMenuProps> {
  static Item: typeof MenuItem = MenuItem;
  static Breadcrumb: typeof Breadcrumb = Breadcrumb;
  static Header: typeof Header = Header;
  static ItemGroup: typeof S.AntdMenu.ItemGroup = S.AntdMenu.ItemGroup;
  static SubMenu = S.AntdMenu.SubMenu;
  static Divider = S.MenuDivider;

  render(): React.ReactNode {
    const { dataSource, ordered, selectable, children, showTextTooltip, ...rest } = this.props;

    return (
      <S.AntdMenu
        ordered={ordered}
        mode="inline"
        inlineIndent={ordered ? 20 : 18}
        {...rest}
        selectable={selectable === undefined ? false : selectable}
      >
        {children ||
          dataSource?.map((item: MenuItemProps, index: number) =>
            item.subMenu ? (
              <SubMenuItem
                parent={item.parent}
                prefixel={item.prefixel}
                suffixel={item.suffixel}
                disabled={item.disabled}
                text={showTextTooltip ? <Tooltip title={item.text}>{item.text}</Tooltip> : item.text}
                description={item.description}
                subMenu={item.subMenu}
                ordered={item.ordered === undefined ? ordered : item.ordered}
                copyable={item.copyable}
                copyHint={item.copyHint}
                copyValue={item.copyValue}
                suffixVisibilityTrigger={item.suffixVisibilityTrigger}
                prefixVisibilityTrigger={item.prefixVisibilityTrigger}
                key={item.key || `${item.text}${index}`} // eslint-disable-line react/no-array-index-key
                menuItemKey={item.key || `${item.text}${index}`}
                {...rest}
                {...item}
              />
            ) : (
              <MenuItem
                className="ds-menu-item"
                parent={item.parent}
                prefixel={item.prefixel}
                suffixel={item.suffixel}
                disabled={item.disabled}
                text={showTextTooltip ? <Tooltip title={item.text}>{item.text}</Tooltip> : item.text}
                description={item.description}
                subMenu={item.subMenu}
                ordered={item.ordered === undefined ? ordered : item.ordered}
                copyable={item.copyable}
                copyHint={item.copyHint}
                copyValue={item.copyValue}
                highlight={item.highlight}
                suffixVisibilityTrigger={item.suffixVisibilityTrigger}
                prefixVisibilityTrigger={item.prefixVisibilityTrigger}
                indentLevel={item.indentLevel || 0}
                type={item.type}
                key={item.key || `${item.text}${index}`} // eslint-disable-line react/no-array-index-key
                menuItemKey={item.key || `${item.text}${index}`}
                {...rest}
                {...item}
              />
            )
          )}
      </S.AntdMenu>
    );
  }
}

export default Menu;
