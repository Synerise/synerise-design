import PageHeader from '@synerise/ds-page-header';

import * as React from 'react';
import {action} from '@storybook/addon-actions';
import Tabs from "@synerise/ds-tabs/dist/Tabs";
import {withState} from "@dump247/storybook-state";
import Icon from "@synerise/ds-icon/dist/Icon";
import {AngleDownS, ArrowRightCircleM} from "@synerise/ds-icon/dist/icons";
import Button from "@synerise/ds-button/dist/Button";
import {boolean, number, select} from "@storybook/addon-knobs";
import Avatar from "@synerise/ds-avatar/dist/Avatar";
import Badge from "antd/lib/badge";
import theme from "@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme";

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

const stories = {
  default: {
    title: 'Default Main page header'
  },
  description: {
    title: 'Main page header with description',
    description: 'Description',
  },
  optionBar: {
    title: 'Main page header with option bar',
    bar: <Button>Function</Button>,
  },
  tabs: withState({
    activeTab: 0,
  })(({ store }) => (
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
    )),
  backButton: {
    title: 'Main page header witch back button',
    onGoBack: action('goBack'),
  },
  closeButton: {
    title: 'Main page header witch close button',
    onClose: action('onClick'),
  },
  examples: withState({
    activeTab: 0,
    value: '',
  })(({ store }) => (
    <PageHeader onGoBack={action('goBack')} bar={<><br/><br/></>} inlineEdit={{
      name: 'name-of-input', value: store.state.value, maxLength: 60, handleOnChange: (event) => {
        store.set({ value: event.target.value })
      }, handleOnBlur: () => action('onBlur'), handleOnEnterPress: () => action('onEnterPress'), placeholder: 'Example text', size: 'normal'
    }}
                more={
                  <Button type="ghost" mode="icon-label">
                    <Icon component={<ArrowRightCircleM />} color={theme.palette['grey-600']} />
                    More details
                  </Button>
                } avatar={
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
  )),
};

export default {
  name: 'Components|Page Header',
  withoutCenter: true,
  stories,
  Component: PageHeader,
};
