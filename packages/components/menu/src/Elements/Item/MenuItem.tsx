import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import { MenuItemProps } from './MenuItem.types';
import SubMenuItem from '../SubMenu/SubMenu';
import { SubMenuProps } from '../SubMenu/SubMenu.types';
import Text from '../Text/Text';

const MenuItem: React.FC<SubMenuProps & MenuItemProps> = (props: SubMenuProps & MenuItemProps) => {
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
  } = props;

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
      {text}
    </Text>
  );
};

export default MenuItem;
