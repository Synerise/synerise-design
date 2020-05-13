import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import { ItemType, MenuItemProps } from './MenuItem.types';
import SubMenuItem from '../SubMenu/SubMenu';
import { SubMenuProps } from '../SubMenu/SubMenu.types';
import Text from './Text/Text';
import Select from './Select/Select';
import Danger from './Danger/Danger';

const MenuItem: React.FC<SubMenuProps & MenuItemProps> = props => {
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
    children,
    type,
    ...rest
  } = props;
  if (subMenu || nestedMenu) {
    return (
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
    );
  }
  switch (type) {
    case ItemType.SELECT:
      return (
        <Select
          onSelect={onSelect}
          prefixel={prefixel}
          suffixel={suffixel}
          key={uuid()}
          disabled={disabled}
          description={description}
          {...rest}
        >
          {text || children}
        </Select>
      );
    case ItemType.DANGER:
      return (
        <Danger
          onSelect={onSelect}
          prefixel={prefixel}
          suffixel={suffixel}
          key={uuid()}
          disabled={disabled}
          description={description}
          {...rest}
        >
          {text || children}
        </Danger>
      );
    default:
      return (
        <Text
          onSelect={onSelect}
          prefixel={prefixel}
          suffixel={suffixel}
          key={uuid()}
          disabled={disabled}
          danger={danger}
          description={description}
          {...rest}
        >
          {text || children}
        </Text>
      );
  }
};

export default MenuItem;
