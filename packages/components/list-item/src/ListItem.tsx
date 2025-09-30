import React from 'react';

import '@synerise/ds-core/dist/js/style';

import { type ListItemProps, itemTypes } from './ListItem.types';
import Danger from './components/Danger/Danger';
import { Divider } from './components/Divider/Divider';
import Select from './components/Select/Select';
import Text from './components/Text/Text';

const ListItem = (props: ListItemProps) => {
  const { text, children, type, ...rest } = props;
  switch (type) {
    case itemTypes.DANGER:
      return <Danger {...rest}>{text || children}</Danger>;
    case itemTypes.SELECT:
      return <Select {...rest}>{text || children}</Select>;
    case itemTypes.DIVIDER:
      return <Divider level={rest.level} />;
    default:
      return <Text {...rest}>{text || children}</Text>;
  }
};

export default ListItem;
