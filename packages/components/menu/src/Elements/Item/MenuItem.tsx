import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import { MenuItemProps } from './MenuItem.types';
import SubMenuItem from '../SubMenu/SubMenu';
import { TextItem } from '../index';
import Menu from '../../Menu';
import { SubMenuProps } from '../SubMenu/SubMenu.types';

class MenuItem extends React.Component<SubMenuProps & MenuItemProps> {
  static Item: typeof TextItem = TextItem;

  shouldComponentUpdate(nextProps: Readonly<SubMenuProps & MenuItemProps>): boolean {
    const { show } = this.props;
    if (show !== nextProps.show) {
      return true;
    }
    return false;
  }

  render(): React.ReactNode {
    const {
      onSelect,
      prefixel,
      suffixel,
      ordered,
      disabled,
      danger,
      index,
      text,
      description,
      subMenu,
      nestedMenu,
      show,
      ...rest
    } = this.props;

    // eslint-disable-next-line no-console
    console.log('MenuItemRender');
    return subMenu || nestedMenu ? (
      <SubMenuItem
        prefixel={prefixel}
        suffixel={suffixel}
        ordered={ordered}
        disabled={disabled}
        danger={danger}
        index={index}
        text={text}
        description={description}
        subMenu={nestedMenu || subMenu}
        {...rest}
      />
    ) : (
      <Menu.Item
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        onSelect={onSelect}
        prefixel={prefixel}
        suffixel={suffixel}
        key={uuid()}
        disabled={disabled}
        danger={danger}
        description={description}
        {...rest}
      >
        {text}
      </Menu.Item>
    );
  }
}

export default MenuItem;
