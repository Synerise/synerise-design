import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Block from '@synerise/ds-block';
import { theme } from '@synerise/ds-core';
import Icon, { EditM } from '@synerise/ds-icon';
import Sidebar, {
  SidebarWithButton as SidebarWithButtonComponent,
} from '@synerise/ds-sidebar';

import {
  CLASSNAME_ARG_CONTROL,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../utils';
import { SIDEBAR_WITH_BUTTON_DATA, createSidebarPanels } from './Sidebar.data';

export default {
  component: Sidebar,
  title: 'Components/Sidebar',
  decorators: [fixedWrapper300],
  argTypes: {
    children: STRING_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
  },
  args: {
    size: 'medium',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula eget ipsum vel elementum. Interdum et malesuada fames ac ante ipsum primis.',
  },
  render: (args) => {
    const [activeKeys, setActiveKeys] = useState<
      string | number | (string | number)[] | undefined
    >(args.activeKey);
    const [order, setOrder] = useState(args.order);

    const handleChange = (keys: string | number | (string | number)[]) => {
      args.onChange?.(keys as string | string[]);
      setActiveKeys(keys);
    };
    const handleChangeOrder = (newOrder) => {
      args.onChangeOrder?.(newOrder);
      setOrder(newOrder);
    };

    return (
      <Sidebar
        {...args}
        activeKey={activeKeys}
        onChange={handleChange}
        order={order}
        onChangeOrder={handleChangeOrder}
      />
    );
  },
} as Meta<typeof Sidebar>;

export const Default: StoryObj<typeof Sidebar> = {
  args: {
    children: createSidebarPanels(),
  },
};

export const DefaultActiveKey: StoryObj<typeof Sidebar> = {
  args: {
    defaultActiveKey: ['1', '2'],
    activeKey: undefined,
    order: ['2', '3', '1'],
    children: createSidebarPanels(),
  },
};

export const DraggablePanels: StoryObj<typeof Sidebar> = {
  args: {
    order: ['2', '3', '1'],
    children: createSidebarPanels(),
  },
};

export const WithBlock: StoryObj<typeof Sidebar> = {
  args: {
    defaultActiveKey: '0',
    children: (
      <Sidebar.Panel header={'Collapse title'} id={'first'}>
        {[...Array(4)].map((_, index) => (
          <Block
            key={index}
            isDragging={false}
            icon={
              <Icon
                component={<EditM />}
                size={24}
                color={theme.palette['grey-600']}
              />
            }
          >
            Block name
          </Block>
        ))}
      </Sidebar.Panel>
    ),
  },
};

export const SidebarWithButton: StoryObj<typeof SidebarWithButtonComponent> = {
  tags: ['deprecated'],
  render: (args) => {
    return <SidebarWithButtonComponent {...args} />;
  },
  args: {
    dataSource: SIDEBAR_WITH_BUTTON_DATA,
    buttonLabel: 'Button',
    title: 'Section Name',
  },
};
