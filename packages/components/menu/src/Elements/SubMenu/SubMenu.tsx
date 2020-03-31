import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';
import * as S from '../../Menu.styles';

import MenuItem from '../Item/MenuItem';
import { MenuItemProps } from '../Item/MenuItem.types';
import { SubMenuProps } from './SubMenu.types';

class SubMenuItem extends React.PureComponent<SubMenuProps & MenuItemProps> {
  render(): React.ReactNode {
    const { text, subMenu, disabled, danger, ordered, ...rest } = this.props;

    return (
      <S.SubMenuItem title={text} key={uuid()} danger={danger} ordered={ordered} disabled={disabled} {...rest}>
        {Boolean(subMenu) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore */
          subMenu.map((subItem: SubMenuProps) => (
            <MenuItem
              parent={subItem.parent}
              checked={subItem.checked}
              prefixel={subItem.prefixel}
              suffixel={subItem.suffixel}
              disabled={subItem.disabled}
              index={subItem.index}
              text={subItem.text}
              danger={subItem.danger}
              nestedMenu={subItem.subMenu}
              ordered={ordered}
              description={subItem.description}
              key={subItem.index} // eslint-disable-line react/no-array-index-key
            />
          ))}
      </S.SubMenuItem>
    );
  }
}

export default SubMenuItem;
