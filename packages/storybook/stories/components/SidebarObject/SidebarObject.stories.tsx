import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import SidebarObject from '@synerise/ds-sidebar-object';
import { ButtonWrapper } from '@synerise/ds-sidebar-object/dist/Elements/Header/Header.style';
import { ButtonVariant, HeaderType } from '@synerise/ds-sidebar-object/dist/Elements/Header/Header.types';
import Icon, { MailM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import { ObjectAvatar } from '@synerise/ds-avatar';

import { ALL_TAGS, BackIcon, StarPrefix, TABS, TEXTS } from './SidebarObject.data';
import { useSidebarObjectOverview } from './hooks/useSidebarObjectOverview';
import { controlFromOptionsArray, fixedWrapper300 } from '../../utils';

type StoryProps = typeof SidebarObject;

export default {
  component: SidebarObject,
  title: 'Components/SidebarObject',
  decorators: [fixedWrapper300],

  render: args => {
    const [drawerVisible, setDrawerVisible] = useState(true);
    const [name, setName] = useState('Winter campaign');
    const [activeTab, setActiveTab] = useState(0);
    const handleCloseClick = () => {
      args.onCloseClick?.();
      setDrawerVisible(false);
    };

    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Show Sidebar Object
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <SidebarObject
            {...args}
            onCloseClick={handleCloseClick}
            activeTab={activeTab}
            handleTabClick={setActiveTab}
            name={name}
            onRename={setName}
          />
        </Drawer>
      </div>
    );
  },
  argTypes: {
    headerType: controlFromOptionsArray('inline-radio', ['readonly', 'editable']),
    typeButtons: controlFromOptionsArray('inline-radio', ['twoButtons', 'withNavigation']),
    headerPreffix: {
      ...controlFromOptionsArray('inline-radio', ['backIcon', 'starPrefix']),
      mapping: {
        backIcon: <BackIcon onBackClickHandler={fn()} />,
        starPrefix: <StarPrefix />
      },
    },
  },
  args: {
    onArrowUp: fn(),
    onArrowDown: fn(),
    onFolderSelect: fn(),
    onEdit: fn(),
    onDuplicate: fn(),
    onMove: fn(),
    onDelete: fn(),
    onId: fn(),
    avatar: (
      <ObjectAvatar
        color={'pink'}
        iconComponent={<Icon color={theme.palette['pink-600']} component={<MailM />} />}
        badgeStatus={'inactive'}
      />
    ),
    headerType: HeaderType.EDITABLE,
    typeButtons: ButtonVariant.TWO_BUTTONS,
    headerTabs: TABS,
    headerPreffix: <StarPrefix />,
    texts: TEXTS,
    footer: (
      <>
        <ButtonWrapper style={{ flex: 1, padding: '0' }}>
          <Button type="secondary"> Settings </Button>
        </ButtonWrapper>
        <ButtonWrapper style={{ padding: '0px 8px 0px 0' }}>
          <Button type="ghost"> Cancel </Button>
        </ButtonWrapper>
        <ButtonWrapper style={{ padding: '0' }}>
          <Button type="primary"> Apply </Button>
        </ButtonWrapper>
      </>
    ),
    inputObject: {
      id: '3423-3426-8263-6634-6834-2352',
    },
  },
} as Meta<StoryProps>;

export const Default: StoryObj<StoryProps> = {};

export const Campaign: StoryObj<StoryProps> = {
  args: {
    headerType: HeaderType.READONLY,
    headerPreffix: <BackIcon onBackClickHandler={fn()} />,
    typeButtons: ButtonVariant.WITH_NAVIGATION
  },
  render: args => {
    const [drawerVisible, setDrawerVisible] = useState(true);
    const [name, setName] = useState('Winter campaign');
    const [activeTab, setActiveTab] = useState(0);
    const { headerTabs } = useSidebarObjectOverview(ALL_TAGS);

    const handleCloseClick = () => {
      args.onCloseClick?.();
      setDrawerVisible(false);
    };

    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Show Sidebar Object
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <SidebarObject
            {...args}
            headerTabs={headerTabs}
            onCloseClick={handleCloseClick}
            activeTab={activeTab}
            handleTabClick={setActiveTab}
            name={name}
            onRename={setName}
          />
        </Drawer>
      </div>
    );
  }

};
