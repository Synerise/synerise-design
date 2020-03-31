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
      ...rest
    } = this.props;

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
