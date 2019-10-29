import PageHeader from '@synerise/ds-page-header';

import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {DSProvider} from '@synerise/ds-core';
import {action} from '@storybook/addon-actions';
import Tabs from "@synerise/ds-tabs/dist/Tabs";
import {withState} from "@dump247/storybook-state";
import Icon from "@synerise/ds-icon/dist/Icon";
import {AngleDownS} from "@synerise/ds-icon/dist/icons";
import Button from "@synerise/ds-button/dist/Button";
import {boolean, number, select} from "@storybook/addon-knobs";
import Avatar from "@synerise/ds-avatar/dist/Avatar";
import Badge from "antd/lib/badge";

const shapes = ['circle', 'square'] as
const ;
const statuses = ['error', 'default', 'success'] as
const ;
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
] as
const ;
const tabs = [
  {
    label: 'Tab first',
  }, {
    label: 'Tab second',
  }, {
    label: 'Tab Third',
  }
];

const stories = storiesOf('Components|Page Header', module);

stories.add('default', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Default Main page header"/>
      </>
    </DSProvider>
  );
});

stories.add('description', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Main page header with description" description="Description"/>
      </>
    </DSProvider>
  );
});

stories.add('option bar', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Main page header with option bar" bar={
          <Button>
            Function
          </Button>}
        />
      </>
    </DSProvider>
  );
});

stories.add('tabs', withState({
  activeTab: 0,
})(({store}) => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Main page header with tabs" tabs={
          <Tabs
            tabs={tabs}
            activeTab={store.state.activeTab}
            handleTabClick={(index: number) => store.set({activeTab: index})}
            configuration={{
              label: 'Manage dashboards',
              action: action('Manage dashboards click'),
            }}
          />
        }/>
      </>
    </DSProvider>
  );
}));

stories.add('tabs and bar', withState({
  activeTab: 0,
})(({store}) => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Main page header with tabs" bar={<><br/><br/></>} tabs={
          <Tabs
            tabs={tabs}
            activeTab={store.state.activeTab}
            handleTabClick={(index: number) => store.set({activeTab: index})}
            configuration={{
              label: 'Manage dashboards',
              action: action('Manage dashboards click'),
            }}
          />
        }/>
      </>
    </DSProvider>
  );
}));

stories.add('isolated', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Nav can be isolated from header's wrapper" isolated={boolean('Isolated', true)}/>
      </>
    </DSProvider>
  );
});

stories.add('back button', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Main page header witch back button" onGoBack={action('goBack')}/>
      </>
    </DSProvider>
  );
});

stories.add('close ', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="close button" onClose={action('onClick')}/>
      </>
    </DSProvider>
  );
});

stories.add('examples', withState({
  activeTab: 0,
})(({store}) => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader onGoBack={action('goBack')} bar={<><br/><br/></>} inlineEdit={boolean('Inline edit', true)}
                    more={boolean('More details', true)} avatar={
          <Badge status={select('status', statuses, 'success')}>
            <Avatar
              backgroundColor={select('backgroundColors', backgroundColors, 'red')}
              disabled={boolean('disabled', false)}
              icon={'mail'}
              hasStatus
              shape={select('shape', shapes, 'circle')}
              size={number('size', 40)}
            />
          </Badge>
        } tabs={
          <Tabs
            tabs={tabs}
            activeTab={store.state.activeTab}
            handleTabClick={(index: number) => store.set({activeTab: index})}
            configuration={{
              label: 'Manage dashboards',
              action: action('Manage dashboards click'),
            }}
          />
        } rightSide={
          <>
            <Button>
              Duplicate
            </Button>
            <Button mode={'split'} type={'primary'}>
              Edit
              <Icon component={<AngleDownS/>} color={'#ffffff'}/>
            </Button>
          </>}
        />
      </>
    </DSProvider>
  );
}));

export default stories;
