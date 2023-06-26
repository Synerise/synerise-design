import * as React from 'react';
import './style/index.less';
import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS, AngleUpS } from '@synerise/ds-icon';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import * as S from './Sidebar.styles';
import { Panel } from './Panel/Panel';
import { SidebarProps, PanelProps, CompareFnType } from './Sidebar.types';
import { SidebarContext } from './Sidebar.context';

const Sidebar: React.FC<SidebarProps> & { Panel: typeof Panel } = ({
  children,
  order = '',
  onChangeOrder,
  defaultActiveKey,
}) => {
  const isDragDrop = !!order;

  const isActive: (checkActive?: boolean | undefined) => React.ReactElement = checkActive => {
    return (
      <Icon
        color={checkActive ? theme.palette['grey-400'] : theme.palette['grey-800']}
        component={checkActive ? <AngleUpS /> : <AngleDownS />}
      />
    );
  };

  const compareByPositionOfKey: CompareFnType = React.useCallback(
    (a, b) => {
      if (!isDragDrop) {
        return 1;
      }
      return order.indexOf(a.props.id) > order.indexOf(b.props.id) ? 1 : -1;
    },
    [isDragDrop, order]
  );

  const changeOrder: (dragIndex: number, hoverIndex: number) => void = (dragIndex, hoverIndex) => {
    const dragItemBlock = order[dragIndex];
    const orderedItems = update(order, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItemBlock],
      ],
    });

    onChangeOrder && onChangeOrder(orderedItems);
  };

  const collapseContent = React.useMemo(
    () => (
      <S.AntdCollapse
        className={isDragDrop ? 'is-drag-drop' : ''}
        defaultActiveKey={defaultActiveKey && defaultActiveKey.map(el => `.${el}`)}
        expandIconPosition="right"
        expandIcon={(panelProps): React.ReactElement => {
          const checkActive = panelProps.isActive;
          return isActive(checkActive);
        }}
      >
        {(React.Children.toArray(children) as React.ReactElement<PanelProps>[]).sort(compareByPositionOfKey)}
      </S.AntdCollapse>
    ),
    [isDragDrop, defaultActiveKey, children, compareByPositionOfKey]
  );

  return isDragDrop ? (
    <DndProvider backend={HTML5Backend}>
      <SidebarContext.Provider value={{ order, setOrder: changeOrder }}>{collapseContent}</SidebarContext.Provider>
    </DndProvider>
  ) : (
    collapseContent
  );
};

Sidebar.Panel = Panel;
export default Sidebar;
