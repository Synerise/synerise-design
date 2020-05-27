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
    const { text, prefixel, subMenu, disabled, danger, ordered, ...rest } = this.props;
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
          <SubmenuText key={uuid()} onClick={onClickHandler} prefixel={prefixel}>
            {text}
          </SubmenuText>
        }
        key={uuidKey}
        danger={danger}
        ordered={ordered}
        disabled={disabled}
        className="ds-menu-item"
        tabIndex={!disabled ? 0 : -1}
        {...rest}
        onTitleClick={onClickHandler}
        childrenCollapsed={childrenCollapsed}
      >
        {Boolean(subMenu) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore */
          subMenu.map((subItem: SubMenuItemProps & {}) => (
            <MenuItem
              parent={subItem.parent}
              prefixel={subItem.prefixel}
              suffixel={subItem.suffixel}
              disabled={subItem.disabled}
              index={subItem.index}
              text={subItem.text}
              danger={subItem.danger}
              nestedMenu={subItem.subMenu}
              ordered={ordered}
              description={subItem.description}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={(): void => {
                subItem.onClick && subItem.onClick(subItem);
              }}
              key={`${subItem.text}-${subItem.index}`} // eslint-disable-line react/no-array-index-key
            />
          ))}
      </S.SubMenuItem>
    );
  }
}

export default SubMenuItem;
