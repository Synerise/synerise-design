import classNames from 'classnames';
import React, {
  Children,
  type ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '@synerise/ds-core';
import Icon, { AngleDownS, AngleUpS } from '@synerise/ds-icon';
import { DragOverlay, SortableContainer } from '@synerise/ds-sortable';

import { DragOverlayPanel } from './DragOverlayPanel/DragOverlayPanel';
import { Panel } from './Panel/Panel';
import { SidebarContext } from './Sidebar.context';
import * as S from './Sidebar.styles';
import { type PanelProps, type SidebarProps } from './Sidebar.types';
import './style/index.less';
import { prefixKeys } from './utils/prefixKeys';

export const Sidebar = ({
  children,
  order = [],
  onChangeOrder,
  defaultActiveKey,
  activeKey,
  onChange,
  className,
  getPopupContainer,
  ...collapseProps
}: SidebarProps) => {
  const [draggedItem, setDraggedItem] = useState<PanelProps | undefined>();
  const isSortable =
    Array.isArray(order) && order.length > 0 && !!onChangeOrder;
  const theme = useTheme();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [activeKeys, setActiveKeys] = useState<(string | number)[]>(() => {
    if (!activeKey && !defaultActiveKey) {
      return [];
    }
    if (activeKey) {
      return Array.isArray(activeKey) ? activeKey : [activeKey];
    }
    if (defaultActiveKey) {
      return Array.isArray(defaultActiveKey)
        ? defaultActiveKey
        : [defaultActiveKey];
    }
    return [];
  });

  const sortableItems = useMemo(
    () =>
      order.map((id) => ({
        id,
      })),
    [order],
  );

  const handleOnChange = useCallback(
    (keys: string | string[]) => {
      const finalKeys = isSortable
        ? (Array.isArray(keys) ? keys : [keys]).map((key) =>
            key.startsWith('.$') ? key.substring(2) : key,
          )
        : keys;
      setActiveKeys(Array.isArray(finalKeys) ? finalKeys : [finalKeys]);
      onChange?.(finalKeys);
    },
    [isSortable, onChange],
  );

  const sortedChildren = useMemo(() => {
    return (Children.toArray(children) as ReactElement<PanelProps>[]).sort(
      (a, b) => {
        if (!isSortable) {
          return 1;
        }
        return Array.isArray(order) &&
          order.indexOf(a.props.id) > order.indexOf(b.props.id)
          ? 1
          : -1;
      },
    );
  }, [children, isSortable, order]);

  const activeKeysProp = useMemo(() => {
    const prependedActiveKey =
      isSortable && activeKey ? prefixKeys(activeKey) : activeKey;
    const prependedDefaultActiveKey =
      isSortable && defaultActiveKey
        ? prefixKeys(defaultActiveKey)
        : defaultActiveKey;

    let keyProp = {};
    if (prependedDefaultActiveKey !== undefined) {
      keyProp = { defaultActiveKey: prependedDefaultActiveKey };
    } else if (prependedActiveKey !== undefined) {
      keyProp = { activeKey: prependedActiveKey };
    }
    return keyProp;
  }, [isSortable, activeKey, defaultActiveKey]);

  const isDraggedPanelActive = useCallback(
    (id: string) => {
      return activeKeys.indexOf(id) > -1;
    },
    [activeKeys],
  );

  const handleDragStart = useCallback(
    ({ active }: { active: { id: string | number } }) => {
      const activePanel = sortedChildren.find(
        (child) => child.props.id === active.id,
      );
      setDraggedItem(activePanel?.props);
    },
    [sortedChildren],
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(undefined);
  }, []);

  const handleOrderChange = (newOrder: { id: string }[]) => {
    onChangeOrder?.(newOrder.map((item) => item.id));
  };

  const collapseContent = useMemo(() => {
    const dragOverlay = (
      <DragOverlay>
        {draggedItem && (
          <DragOverlayPanel
            isActive={isDraggedPanelActive(draggedItem.id)}
            forceRender={isDraggedPanelActive(draggedItem.id)}
            {...draggedItem}
            draggable
            id="-1"
            key="-1"
          />
        )}
      </DragOverlay>
    );
    return (
      <div ref={wrapperRef}>
        <S.AntdCollapse
          {...activeKeysProp}
          className={classNames({
            'is-drag-drop': isSortable,
            className,
          })}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <Icon
              color={theme.palette['grey-600']}
              component={isActive ? <AngleUpS /> : <AngleDownS />}
            />
          )}
          onChange={handleOnChange}
          {...collapseProps}
        >
          {isSortable ? sortedChildren : children}
        </S.AntdCollapse>
        {wrapperRef.current && getPopupContainer
          ? createPortal(dragOverlay, getPopupContainer(wrapperRef.current))
          : dragOverlay}
      </div>
    );
  }, [
    draggedItem,
    isDraggedPanelActive,
    activeKeysProp,
    isSortable,
    className,
    handleOnChange,
    collapseProps,
    sortedChildren,
    children,
    getPopupContainer,
    theme.palette,
  ]);

  return isSortable ? (
    <SortableContainer
      axis="y"
      items={sortableItems}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
      onOrderChange={handleOrderChange}
    >
      <SidebarContext.Provider value={{ isSortable }}>
        {collapseContent}
      </SidebarContext.Provider>
    </SortableContainer>
  ) : (
    collapseContent
  );
};

Sidebar.Panel = Panel;
export default Sidebar;
