import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, object } from '@storybook/addon-knobs';
import Select from '@synerise/ds-select';

const decorator = (storyFn) => (
  <div style={{ padding: '20px', width: '322px' }}>
    {storyFn()}
  </div>
);

const { Option, OptGroup } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const modes = ['default', 'multiple', 'tags'];
const sizes = ['default', 'large', 'small'];
const values = ['Option A', 'Option B', 'Option C'];
const dropdownMenuStyles = {};
const dropdownStyles = {};

const stories = {
  default: () => ({
    description: text('description', 'Description'),
    errorText: text('errorText', 'Error'),
    label: text('label', 'Label'),
    allowClear: boolean('allowClear', true),
    defaultActiveFirstOption: boolean('defaultActiveFirstOption', true),
    defaultValue: text('defaultValue', 'Option A'),
    disabled: boolean('disabled', false),
    dropdownMatchSelectWidth: boolean('dropdownMatchSelectWidth', true),
    dropdownStyle: object('dropdownStyle', dropdownMenuStyles),
    dropdownMenuStyle: object('dropdownMenuStyle', dropdownStyles),
    loading: boolean('loading', false),
    mode: select('mode', modes, 'default'),
    onBlur: action('I am blurred'),
    onFocus: action('I am focused'),
    placeholder: text('placeholder', 'Please select value...'),
    size: select<'default' | 'small' | 'large'>('size', sizes as any, 'default'),
    showArraow: boolean('showArrow', false),
    onChange: action('OnChange'),
    style: { width: '100%' },
    children: (values.map(opt => (
      <Option value={opt}>{opt}</Option>
    ))),
  }),
  multipleMode: {
    style: {
      width: '100%',
    },
    mode: 'multiple',
    defaultValue: 'a10',
    onChange: action('OnChange'),
    children,
  },
  withOptGroup: {
    style: {
      width: '100%',
    },
    defaultValue: 'lucy',
    onChange: action('OnChange'),
    children: [
      (<OptGroup label="Manager">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
      </OptGroup>),
      (<OptGroup label="Engineer">
        <Option value="Yiminghe">yiminghe</Option>
      </OptGroup>),
    ],
  },
};

export default {
  name: 'Components|Select|Basic',
  decorator,
  stories,
  Component: Select,
};
