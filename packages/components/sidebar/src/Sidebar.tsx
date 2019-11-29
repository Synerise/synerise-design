import * as React from 'react';
import './style/index.less';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import { AngleDownS, AngleUpS } from '@synerise/ds-icon/dist/icons';
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

  const compareByPositionOfKey: CompareFnType = (a, b) => {
    if (!isDragDrop) {
      return 1;
    }
    return order.indexOf(a.props.id) > order.indexOf(b.props.id) ? 1 : -1;
  };

  const changeOrder: (dragIndex: number, hoverIndex: number) => void = (dragIndex, hoverIndex) => {
    const dragItemBlock = order[dragIndex];
    const orderedItems = update(order, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragItemBlock]],
    });

    onChangeOrder && onChangeOrder(orderedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarContext.Provider value={{ order, setOrder: changeOrder }}>
        <S.AntdCollapse
          className={isDragDrop ? 'is-drag-drop' : ''}
          defaultActiveKey={defaultActiveKey && defaultActiveKey.map(el => `.${el}`)}
          expandIcon={(panelProps): React.ReactElement => {
            const checkActive = panelProps.isActive;
            return isActive(checkActive);
          }}
          expandIconPosition="right"
        >
          {React.Children.toArray(children as React.ReactElement<PanelProps>).sort(compareByPositionOfKey)}
        </S.AntdCollapse>
      </SidebarContext.Provider>
    </DndProvider>
  );
};

Sidebar.Panel = Panel;
export default Sidebar;
