import Navbar from '@synerise/ds-navbar';

import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {DSProvider} from '@synerise/ds-core';
import {select} from "@storybook/addon-knobs";
import Avatar from "@synerise/ds-avatar/dist/Avatar";
import Button from "@synerise/ds-button/dist/Button";
import Dropdown from "@synerise/ds-dropdown/dist/Dropdown";
import Icon from '@synerise/ds-icon';
import { AngleDownS, NotificationsPlayM, CalendarM, DashboardM} from '@synerise/ds-icon/dist/icons';
import List from "@synerise/ds-list/dist/List";
import {action} from "@storybook/addon-actions";
import FileM from "@synerise/ds-icon/dist/icons/FileM";
import * as S from "@synerise/ds-navbar/dist/Navbar.styles";

const backgroundColors = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
  '#0b68ff',
] as const;

const buttonStyle = {
  color: '#ffffff',
};

const dataSingle = [
  [
    { text: 'Item 1', disabled: true },
    { text: 'Item 2', disabled: false },
    { text: 'Item 3', disabled: true },
    { text: 'Item 4', disabled: false, danger: true },
  ],
];

const logoSrc = 'https://synerise.com/synerise/assets/svg/logos/logo-white.png';
const avatarSrc = 'https://hsto.org/web/77c/061/c05/77c061c0550f4acd98380bf554eb8886.png';

storiesOf('Components|Navbar', module)
  .add('default', () => (
    <DSProvider code="en_GB">
      <Navbar description={'Module name'} logo={logoSrc}
              color={select('Background color', backgroundColors, '#0b68ff')} actions={
        <>
          <Icon component={<DashboardM />} color={'#ffffff'} size={24} onClick={action('onClick')} />
          <Icon component={<CalendarM />} color={'#ffffff'} size={24} onClick={action('onClick')} />
          <Icon component={<NotificationsPlayM />} color={'#ffffff'} size={24} onClick={action('onClick')} />
        </>
      }>
        <S.NavbarDivider />
        <Dropdown trigger={['click']} overlay={
          <div style={{ background: '#fff', width: '300px' }}>
            <List
              header="Folders"
              dataSource={dataSingle}
              renderItem={item => (
                <List.Item
                  onSelect={action('onSelect')}
                  icon={<Icon component={<FileM />} />}
                  disabled={item.disabled}
                  danger={item.danger}
                >
                  {item.text}
                </List.Item>
              )}
            />
          </div>
        }>
          <Button mode={'label-icon'} type={'ghost'} style={buttonStyle}>
            Profile Name
            <Icon component={<AngleDownS />} color={'#ffffff'} />
          </Button>
        </Dropdown>
        <S.NavbarDivider />
        <Avatar
          src={avatarSrc}
          shape={'circle'}
          size={32}
        />
      </Navbar>
    </DSProvider>
  ));