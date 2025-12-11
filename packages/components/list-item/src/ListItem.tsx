import React, {
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
  useContext,
} from 'react';

import { useDropdown } from '@synerise/ds-core';

import { type ItemData, type ListItemProps, itemTypes } from './ListItem.types';
import Danger from './components/Danger/Danger';
import { Divider } from './components/Divider/Divider';
import { Header } from './components/Header/Header';
import { ListContext } from './components/ListContext/ListContext';
import Select from './components/Select/Select';
import Text from './components/Text/Text';

const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (props, forwardedRef) => {
    const { text, children, type, onClick: onClickProp, ...rest } = props;
    const listItemContext = useContext(ListContext);
    const dropdownContext = useDropdown();

    const handleClick = (
      itemData: ItemData<
        MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
      >,
    ) => {
      listItemContext?.onClick?.(itemData);
      onClickProp?.(itemData);
      if (dropdownContext?.hideOnItemClick === true) {
        dropdownContext?.setIsOpen(false);
      }
    };

    switch (type) {
      case itemTypes.DANGER:
        return (
          <Danger
            ref={forwardedRef}
            onClick={handleClick}
            ItemComponent={ListItem}
            {...rest}
          >
            {text || children}
          </Danger>
        );
      case itemTypes.SELECT:
        return (
          <Select
            ref={forwardedRef}
            onClick={handleClick}
            ItemComponent={ListItem}
            {...rest}
          >
            {text || children}
          </Select>
        );
      case itemTypes.DIVIDER:
        return <Divider level={rest.level} />;
      case itemTypes.HEADER:
        return (
          <Header
            ref={forwardedRef}
            style={rest.style}
            className={rest.className}
          >
            {text || children}
          </Header>
        );
      default:
        return (
          <Text
            ref={forwardedRef}
            onClick={handleClick}
            {...rest}
            ItemComponent={ListItem}
          >
            {text || children}
          </Text>
        );
    }
  },
);

export default ListItem;
