import React, { useState } from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';

import Button from '@synerise/ds-button';
import Drawer from '@synerise/ds-drawer';
import Icon, { SearchM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import SearchBar from '@synerise/ds-search-bar';
import Tabs from '@synerise/ds-tabs';
import Typography from 'antd/lib/typography';

import {
  closeActionTypes,
  headerTypes,
  renderActionButtons,
  renderBackIcon,
  renderDrawerContent,
  TABS,
} from './Drawer.data';

import {
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
} from '../../utils';






export default {
  title: "Components/Drawer",
  tags: ['autodocs'],
  component: Drawer,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
  },
} as Meta<typeof Drawer>;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Show drawer
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <Drawer.DrawerHeader>
            <Drawer.DrawerHeaderBar>
              {renderBackIcon(headerTypes.singleTitle, () => setDrawerVisible(false))}
              <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
                Title
              </Typography.Title>
              {renderActionButtons(closeActionTypes.singleCloseIcon, () => setDrawerVisible(false))}
            </Drawer.DrawerHeaderBar>
          </Drawer.DrawerHeader>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>{renderDrawerContent()}</Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    );
  },
};

export const WithTabs: Story = {
  render: () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Show drawer
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerTypes.singleTitleWithBackIcon, () => setDrawerVisible(false))}
                <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
                  Title
                </Typography.Title>
                {renderActionButtons(closeActionTypes.twoButtons, () => setDrawerVisible(false))}
              </Drawer.DrawerHeaderBar>
              <Tabs
                activeTab={activeTab}
                tabs={TABS}
                handleTabClick={setActiveTab}
                configuration={{ label: 'Configure', action: action('onConfigurationClick') }}
              />
            </Drawer.DrawerHeader>
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>{renderDrawerContent()}</Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Show drawer
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerTypes.singleTitleWithBackIcon, () => setDrawerVisible(false))}
                <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
                  Title
                </Typography.Title>
                {renderActionButtons(closeActionTypes.twoButtons, () => setDrawerVisible(false))}
              </Drawer.DrawerHeaderBar>
            </Drawer.DrawerHeader>
            <SearchBar
              disabled={false}
              borderRadius={false}
              autofocus={false}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
              value={searchQuery}
              onSearchChange={targetValue => setSearchQuery(targetValue)}
              placeholder={'Search'}
              onClearInput={() => setSearchQuery('')}
              clearTooltip={'Clear'}
            />
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>{renderDrawerContent(searchQuery)}</Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    );
  },

};

export const WithSearchAndTabs: Story = {
  render: () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Show drawer
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerTypes.singleTitleWithBackIcon, () => setDrawerVisible(false))}
                <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
                  Title
                </Typography.Title>
                {renderActionButtons(closeActionTypes.twoButtons, () => setDrawerVisible(false))}
              </Drawer.DrawerHeaderBar>
              <Tabs
                activeTab={activeTab}
                tabs={TABS}
                handleTabClick={setActiveTab}
                configuration={{ label: 'Configure', action: () => { } }}
              />
            </Drawer.DrawerHeader>
            <SearchBar
              disabled={false}
              borderRadius={false}
              autofocus={false}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
              value={searchQuery}
              onSearchChange={targetValue => setSearchQuery(targetValue)}
              placeholder={'Search'}
              onClearInput={() => setSearchQuery('')}
              clearTooltip={'Clear'}
            />
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>{renderDrawerContent(searchQuery)}</Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    );
  },

};