import * as React from 'react';
import './style/index.less';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import { AngleDownS, AngleUpS } from '@synerise/ds-icon/dist/icons';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as S from './Sidebar.styles';

export type SidebarProps = {
  children: React.ReactNode | string;
  id: any;
  text: any;
  index: any;
  moveCard: any;
  order: any;
  onChangeOrder: any;
};

const SortableWrapper: any = ({ children }: { children: (ref: any) => React.ReactElement }) => {
  const ref: any = 'test';

  return children(ref);
};

const Sidebar: React.FC<SidebarProps> & { AntdPanel: typeof S.AntdPanel } = props => {
  const { children } = props;

  const isActive: any = (checkActive?: boolean | undefined) => {
    return (
      <Icon
        color={checkActive ? theme.palette['grey-400'] : theme.palette['grey-800']}
        component={checkActive ? <AngleUpS /> : <AngleDownS />}
      />
    );
  };

  const childrenWithProps:any  = React.Children.map(children, child => (
    <SortableWrapper>{ref => React.cloneElement(child, { extra: <div> Handle {ref}</div> })}</SortableWrapper>
  ));

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <S.AntdCollapse
          expandIcon={(panelProps):any => {
            const checkActive = panelProps.isActive;
            return isActive(checkActive);
          }}
          expandIconPosition="right"
        >
          {childrenWithProps}
        </S.AntdCollapse>
      </DndProvider>
    </>
  );
};

Sidebar.AntdPanel = S.AntdPanel;
export default Sidebar;
