import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';
import * as S from '../../Menu.styles';

import MenuItem from '../Item/MenuItem';
import { MenuItemProps } from '../Item/MenuItem.types';
import { SubMenuItemProps, SubMenuProps, SubMenuState } from './SubMenu.types';
import SubmenuText from '../Item/SubmenuText/SubmenuText';

class SubMenuItem extends React.PureComponent<SubMenuProps & MenuItemProps, SubMenuState> {
  state = { childrenCollapsed: true, uuidKey: uuid() };

  render(): React.ReactNode {
    const { text, prefixel, suffixel, subMenu, disabled, danger, ordered, ...rest } = this.props;
    const { childrenCollapsed, uuidKey } = this.state;
    const onClickHandler = (): void => {
      this.setState(prevState => ({
        ...prevState,
        childrenCollapsed: !prevState.childrenCollapsed,
      }));
    };
    return (
      <S.SubMenuItem
        title={
          <SubmenuText key={`${uuidKey}-title`} onClick={onClickHandler} prefixel={prefixel} suffixel={suffixel}>
            {text}
          </SubmenuText>
        }
        key={uuidKey}
        danger={danger}
        ordered={ordered}
        disabled={disabled}
        tabIndex={!disabled ? 0 : -1}
        {...rest}
        className="ds-menu-item"
        onTitleClick={onClickHandler}
        childrenCollapsed={childrenCollapsed}
      >
        {Boolean(subMenu) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore */
          subMenu.map((subItem: SubMenuItemProps, index: number) => (
            <MenuItem
              parent={subItem.parent}
              prefixel={subItem.prefixel}
              suffixel={subItem.suffixel}
              disabled={subItem.disabled}
              text={subItem.text}
              danger={subItem.danger}
              subMenu={subItem.subMenu}
              ordered={ordered}
              description={subItem.description}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={(): void => {
                subItem.onClick && subItem.onClick(subItem);
              }}
              key={`${uuidKey}-${index}`} // eslint-disable-line react/no-array-index-key
            />
          ))}
      </S.SubMenuItem>
    );
  }
}

export default SubMenuItem;
