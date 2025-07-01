import update from 'immutability-helper';
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS, AngleUpS } from '@synerise/ds-icon';

import { Panel } from './Panel/Panel';
import { SidebarContext } from './Sidebar.context';
import * as S from './Sidebar.styles';
import {
  type CompareFnType,
  type PanelProps,
  type SidebarProps,
} from './Sidebar.types';
import './style/index.less';

const prependDots = (keys: string | number | (string | number)[]) => {
  return keys && Array.isArray(keys) ? keys.map((el) => `.${el}`) : `.${keys}`;
};

const Sidebar: React.FC<SidebarProps> & { Panel: typeof Panel } = ({
  children,
  order = [],
  onChangeOrder,
  defaultActiveKey,
  activeKey,
  onChange,
  ...collapseProps
}) => {
  const isDragDrop = Array.isArray(order) && order.length > 0;

  const isActive: (checkActive?: boolean | undefined) => React.ReactElement = (
    checkActive,
  ) => {
    return (
      <Icon
        color={theme.palette['grey-600']}
        component={checkActive ? <AngleUpS /> : <AngleDownS />}
      />
    );
  };

  const compareByPositionOfKey: CompareFnType = React.useCallback(
    (a, b) => {
      if (!isDragDrop) {
        return 1;
      }
      return Array.isArray(order) &&
        order.indexOf(a.props.id) > order.indexOf(b.props.id)
        ? 1
        : -1;
    },
    [isDragDrop, order],
  );

  const changeOrder: (dragIndex: number, hoverIndex: number) => void = (
    dragIndex,
    hoverIndex,
  ) => {
    const dragItemBlock = order[dragIndex];
    const orderedItems = update(order, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItemBlock],
      ],
    });

    onChangeOrder && onChangeOrder(orderedItems);
  };

  const handleOnChange = React.useCallback(
    (keys: string | string[]) => {
      const finalKeys = isDragDrop
        ? (Array.isArray(keys) ? keys : [keys]).map((key) =>
            key.startsWith('.') ? key.substring(1) : key,
          )
        : keys;
      onChange && onChange(finalKeys);
    },
    [isDragDrop, onChange],
  );

  const antdActiveKey =
    isDragDrop && activeKey ? prependDots(activeKey) : activeKey;
  const antdDefaultActiveKey =
    isDragDrop && defaultActiveKey
      ? prependDots(defaultActiveKey)
      : defaultActiveKey;

  const collapseContent = React.useMemo(() => {
    let activeKeysProp = {};
    if (antdDefaultActiveKey !== undefined) {
      activeKeysProp = { defaultActiveKey: antdDefaultActiveKey };
    } else if (antdActiveKey !== undefined) {
      activeKeysProp = { activeKey: antdActiveKey };
    }
    return (
      <S.AntdCollapse
        {...activeKeysProp}
        className={isDragDrop ? 'is-drag-drop' : ''}
        expandIconPosition="end"
        expandIcon={(panelProps): React.ReactElement => {
          const checkActive = panelProps.isActive;
          return isActive(checkActive);
        }}
        onChange={handleOnChange}
        {...collapseProps}
      >
        {isDragDrop
          ? (
              React.Children.toArray(
                children,
              ) as React.ReactElement<PanelProps>[]
            ).sort(compareByPositionOfKey)
          : children}
      </S.AntdCollapse>
    );
  }, [
    antdDefaultActiveKey,
    antdActiveKey,
    isDragDrop,
    handleOnChange,
    collapseProps,
    children,
    compareByPositionOfKey,
  ]);

  return isDragDrop ? (
    // @ts-expect-error Property 'children' does not exist on type 'IntrinsicAttributes & DndProviderProps<any, any>'.
    <DndProvider backend={HTML5Backend}>
      <SidebarContext.Provider value={{ order, setOrder: changeOrder }}>
        {collapseContent}
      </SidebarContext.Provider>
    </DndProvider>
  ) : (
    collapseContent
  );
};

Sidebar.Panel = Panel;
export default Sidebar;
