import React from 'react';
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

const mockContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut consectetur ex harum in";

const panelsData = [
  { header: 'First name', id: 'first' },
  { header: 'Second name', id: 'second' },
  { header: 'Third name', id: 'third' },
];

const createSidebarPanels = () =>
  panelsData.map(panel => (
    <Sidebar.Panel header={panel.header} id={panel.id} key={panel.id}>
      {mockContent}
    </Sidebar.Panel>
  ));

const stories = {
  default: () => (
    <div style={wrapperStyles}>
      <Sidebar>
        {createSidebarPanels()}
      </Sidebar>
    </div>
  ),
  defaultActive: () => {
    const createPanel = (header, id) => (
      <Sidebar.Panel header={header} id={id} key={id}>
        {mockContent}
      </Sidebar.Panel>
    );

    return (
      <div style={wrapperStyles}>
        <Sidebar defaultActiveKey={['1', '2']}>
          {createPanel('First name', '1')}
          {createPanel('Second name', '2')}
          {createPanel('Third name', '3')}
        </Sidebar>
      </div>
    );
  },

  setActiveKey: () => {
    const createPanel = (header, id) => (
      <Sidebar.Panel header={header} id={id} key={id}>
        {mockContent}
      </Sidebar.Panel>
    );

    const [activeKeys, setActiveKeys] = React.useState([]);

    const handleChange = (keys) => {
      console.log('onchange', keys);
      setActiveKeys(keys);
    }
    return (
      <div style={wrapperStyles}>
        <Sidebar activeKey={activeKeys} onChange={handleChange}>
          {createPanel('First name', '1')}
          {createPanel('Second name', '2')}
          {createPanel('Third name', '3')}
        </Sidebar>
      </div>
    );
  },
  dragAndDrop: withState({ currentOrder: ['second', 'third', 'first'] })(({ store }) => (
    <div style={wrapperStyles}>
      <Sidebar
        order={store.state.currentOrder}
        onChangeOrder={order => store.set({ currentOrder: order })}
      >
        {createSidebarPanels()}
      </Sidebar>
    </div>
  )),
  sidebarWithBlock: () => (
    <div style={wrapperStyles}>
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={'Collapse title'} id={'first'}>
          {[...Array(4)].map((_, index) => (
            <Block key={index} isDragging={false} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']} />}>
              Block name
            </Block>
          ))}
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
