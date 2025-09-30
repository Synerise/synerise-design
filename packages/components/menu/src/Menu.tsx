import React, { Children, Component, type ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';
import Icon, { ArrowDownCircleM, ArrowUpCircleM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import Breadcrumb from './Elements/Breadcrumb/Breadcrumb';
import { Divider } from './Elements/Divider/Divider';
import Header from './Elements/Header/Header';
import MenuItem from './Elements/Item/MenuItem';
import SubMenuItem from './Elements/SubMenu/SubMenu';
import * as S from './Menu.styles';
import type { AntdMenuProps, MenuItemProps } from './Menu.types';
import './style/index.less';

export class Menu extends Component<
  AntdMenuProps,
  { allItemsVisible: boolean }
> {
  static Item: typeof MenuItem = MenuItem;
  static Breadcrumb: typeof Breadcrumb = Breadcrumb;
  static Header: typeof Header = Header;
  static ItemGroup: typeof S.AntdMenu.ItemGroup = S.AntdMenu.ItemGroup;
  static SubMenu = S.AntdMenu.SubMenu;
  static Divider: typeof Divider = Divider;

  state = {
    allItemsVisible: false,
  };

  toggleItems() {
    const { allItemsVisible } = this.state;
    this.setState({ allItemsVisible: !allItemsVisible });
  }

  render(): ReactNode {
    const {
      dataSource,
      ordered,
      selectable,
      children,
      showTextTooltip,
      texts,
      maxToShowItems,
      ...rest
    } = this.props;
    const { allItemsVisible } = this.state;

    const allTexts = {
      showLess: (
        <FormattedMessage id="DS.MENU.SHOW-LESS" defaultMessage="Show less" />
      ),
      showMore: (
        <FormattedMessage id="DS.MENU.SHOW-MORE" defaultMessage="Show more" />
      ),
      ...texts,
    };
    const isListTogglable = maxToShowItems !== undefined;
    const isDataSource = dataSource !== undefined;
    const childrenArray = Children.toArray(children);

    const itemsCount =
      (isDataSource ? dataSource.length : childrenArray.length) || 0;
    const itemsOverLimit = isListTogglable ? itemsCount - maxToShowItems : 0;
    const visibleItems =
      allItemsVisible || !isListTogglable
        ? dataSource
        : dataSource?.slice(0, maxToShowItems);
    const visibleChildren =
      allItemsVisible || !isListTogglable
        ? children
        : childrenArray.slice(0, maxToShowItems);
    const toggleButtonLabel = allItemsVisible
      ? allTexts.showLess
      : allTexts.showMore;

    const toggleButton = isListTogglable && itemsOverLimit > 0 && (
      <Button
        onClick={() => this.toggleItems()}
        type="ghost-primary"
        mode="icon-label"
      >
        <Icon
          component={
            allItemsVisible ? <ArrowUpCircleM /> : <ArrowDownCircleM />
          }
        />
        {toggleButtonLabel}
      </Button>
    );

    return (
      <>
        <S.AntdMenu
          ordered={ordered}
          mode="inline"
          inlineIndent={ordered ? 20 : 18}
          {...rest}
          selectable={selectable === undefined ? false : selectable}
        >
          {isDataSource
            ? visibleItems?.map((item: MenuItemProps, index: number) =>
                item.subMenu ? (
                  <SubMenuItem
                    parent={item.parent}
                    prefixel={item.prefixel}
                    suffixel={item.suffixel}
                    disabled={item.disabled}
                    text={
                      showTextTooltip ? (
                        <Tooltip title={item.text}>{item.text}</Tooltip>
                      ) : (
                        item.text
                      )
                    }
                    description={item.description}
                    subMenu={item.subMenu}
                    ordered={
                      item.ordered === undefined ? ordered : item.ordered
                    }
                    copyable={item.copyable}
                    copyHint={item.copyHint}
                    copyValue={item.copyValue}
                    suffixVisibilityTrigger={item.suffixVisibilityTrigger}
                    prefixVisibilityTrigger={item.prefixVisibilityTrigger}
                    key={item.key || `${item.text}${index}`}
                    menuItemKey={item.key || `${item.text}${index}`}
                    {...rest}
                    {...item}
                    ItemComponent={MenuItem}
                  />
                ) : (
                  <MenuItem
                    className="ds-menu-item"
                    parent={item.parent}
                    prefixel={item.prefixel}
                    suffixel={item.suffixel}
                    disabled={item.disabled}
                    text={
                      showTextTooltip ? (
                        <Tooltip title={item.text}>{item.text}</Tooltip>
                      ) : (
                        item.text
                      )
                    }
                    description={item.description}
                    subMenu={item.subMenu}
                    ordered={
                      item.ordered === undefined ? ordered : item.ordered
                    }
                    copyable={item.copyable}
                    copyHint={item.copyHint}
                    copyValue={item.copyValue}
                    highlight={item.highlight}
                    suffixVisibilityTrigger={item.suffixVisibilityTrigger}
                    prefixVisibilityTrigger={item.prefixVisibilityTrigger}
                    indentLevel={item.indentLevel || 0}
                    type={item.type}
                    key={item.key || `${item.text}${index}`}
                    menuItemKey={item.key || `${item.text}${index}`}
                    {...rest}
                    {...item}
                  />
                ),
              )
            : visibleChildren}
        </S.AntdMenu>
        {toggleButton}
      </>
    );
  }
}

export default Menu;
