import * as React from 'react';

import Sidebar from '@synerise/ds-sidebar';
import { withState } from '@dump247/storybook-state';
import Block from '@synerise/ds-block';
import Icon, { EditM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import SidebarWithButton from '@synerise/ds-sidebar/dist/SidebarWithButton/SidebarWithButton';

const wrapperStyles = {
  width: '338px',
  background: 'white',
  paddingBottom: '24px',
};
const data = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
];

const stories = {
  default: () => (
    <div style={wrapperStyles}>
      <Sidebar>
        <Sidebar.Panel header={'First name'} id={'first'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut consectetur ex harum in
        </Sidebar.Panel>
        <Sidebar.Panel header={'Second name'} id={'second'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste
          labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </Sidebar.Panel>
        <Sidebar.Panel header={'Third name'} id={'third'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste
          labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </Sidebar.Panel>
      </Sidebar>
    </div>
  ),
  defaultActive: () => (
    <div style={wrapperStyles}>
      <Sidebar defaultActiveKey={['0', '2']}>
        <Sidebar.Panel header={'First name'} id={'first'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut consectetur ex harum in
        </Sidebar.Panel>
        <Sidebar.Panel header={'Second name'} id={'second'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste
          labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </Sidebar.Panel>
        <Sidebar.Panel header={'Third name'} id={'third'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste
          labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </Sidebar.Panel>
      </Sidebar>
    </div>
  ),
  dragAndDrop: withState({ currentOrder: ['second', 'third', 'first'] })(({ store }) => (
    <div style={wrapperStyles}>
      <Sidebar
        order={store.state.currentOrder}
        onChangeOrder={order => {
          store.set({ currentOrder: order });
        }}
      >
        <Sidebar.Panel header={'First name'} id={'first'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut consectetur ex harum in
        </Sidebar.Panel>
        <Sidebar.Panel header={'Second name'} id={'second'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste
          labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </Sidebar.Panel>
        <Sidebar.Panel header={'Third name'} id={'third'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste
          labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </Sidebar.Panel>
      </Sidebar>
    </div>
  )),
  sidebarWithBlock: () => (
    <div style={wrapperStyles}>
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={'Collapse title'} id={'first'}>
          <Block isDragging={false} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']} />}>
            Block name
          </Block>
          <Block isDragging={false} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']} />}>
            Block name
          </Block>
          <Block isDragging={false} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']} />}>
            Block name
          </Block>
          <Block isDragging={false} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']} />}>
            Block name
          </Block>
        </Sidebar.Panel>
      </Sidebar>
    </div>
  ),
  sidebarWithButton: () => (
    <div style={{
      display: 'flex',
      width: '338px',
      background: 'white',
      paddingBottom: '24px',
      height: '100%',
    }}>
      <SidebarWithButton buttonLabel="Button" title="Section Name" dataSource={data}/>
    </div>
  ),

};

export default {
name: 'Components/Sidebar',
  withoutCenter: true,
  config: {},
  stories,
  Component: Sidebar,
};
