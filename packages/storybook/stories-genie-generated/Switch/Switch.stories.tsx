{
  import React from 'react';
  import {
    Story
  } from '@storybook/react';
  import {
    Switch,
    Props
  } from './Switch';
  export default {
    title: 'Components/Switch',
    component: Switch,
  };
  const Template: Story < Props > = (args) => <Switch {...args} />;
  export const Primary = Template.bind({});
  Primary.args = {
    label: 'Switch',
    description: 'This is a switch component',
  };
  export const Error = Template.bind({});
  Error.args = {
    label: 'Switch',
    errorText: 'Error message',
  };
  export const Disabled = Template.bind({});
  Disabled.args = {
    label: 'Switch',
    disabled: true,
  };
  export const Large = Template.bind({});
  Large.args = {
    label: 'Switch',
    size: 'large',
  };
  export const Small = Template.bind({});
  Small.args = {
    label: 'Switch',
    size: 'small',
  };
  export const Loading = Template.bind({});
  Loading.args = {
    label: 'Switch',
    loading: true,
  };
  export const CustomColors = Template.bind({});
  CustomColors.args = {
    label: 'Switch',
    color: '#ff0000',
  };
  export const WithOnChange = Template.bind({});
  WithOnChange.args = {
    label: 'Switch',
    onChange: (checked) => {
      console.log(`Switch toggled: ${checked}`);
    },
  };
  export const CustomComponent = Template.bind({});
  CustomComponent.args = {
    label: 'Switch',
    component: <div>Custom Component</div>,
  };
}