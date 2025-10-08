import React, { forwardRef, useContext } from 'react';

import { type ListItemProps, itemTypes } from './ListItem.types';
import Danger from './components/Danger/Danger';
import { Divider } from './components/Divider/Divider';
import { Header } from './components/Header/Header';
import { ListContext } from './components/ListContext/ListContext';
import Select from './components/Select/Select';
import Text from './components/Text/Text';

const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (props, forwardedRef) => {
    const {
      text,
      children,
      type,
      onClick: onClickProp,
      onItemSelect: onItemSelectProp,
      ...rest
    } = props;
    const listItemContext = useContext(ListContext);
    switch (type) {
      case itemTypes.DANGER:
        return (
          <Danger
            ref={forwardedRef}
            onClick={(itemData) => {
              listItemContext?.onClick?.(itemData);
              onClickProp?.(itemData);
            }}
            onItemSelect={(itemData) => {
              listItemContext?.onItemSelect?.(itemData);
              onItemSelectProp?.(itemData);
            }}
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
            onClick={(itemData) => {
              listItemContext?.onClick?.(itemData);
              onClickProp?.(itemData);
            }}
            onItemSelect={(itemData) => {
              listItemContext?.onItemSelect?.(itemData);
              onItemSelectProp?.(itemData);
            }}
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
            onClick={(itemData) => {
              listItemContext?.onClick?.(itemData);
              onClickProp?.(itemData);
            }}
            onItemSelect={(itemData) => {
              listItemContext?.onItemSelect?.(itemData);
              onItemSelectProp?.(itemData);
            }}
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
