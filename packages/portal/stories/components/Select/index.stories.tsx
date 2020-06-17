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
  children.push(
    <Option key={`Options ${i.toString(36).toUpperCase()}`}>{`Option ${i.toString(36).toUpperCase()}`}</Option>
  );
}

const modes = ['default', 'multiple', 'tags'];
const sizes = ['default', 'large', 'small'];
const values = ['Option A', 'Option B', 'Option C'];
const dropdownMenuStyles = {};
const dropdownStyles = {};
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};


const stories = {
  default: () => {
    const validationState = boolean('Set validation state', false)
    const message = 'Error'
    const [isFocus, setFocus] = React.useState(false)
    return {
      tooltip: text('tooltip', 'This is example tooltip!'),
      clearTooltip: text('Clear tooltip', 'Clear'),
      description: text('description', 'Description'),
      errorText:!isFocus && getErrorText(validationState,message),
      error:!isFocus && validationState,
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
      onBlur:()=>{ action ('I am blurred'); setFocus(false) },
      onFocus: ()=>{ action('I am focused'); setFocus(true)},
      placeholder: text('placeholder', 'Please select value...'),
      size: select<'default' | 'small' | 'large'>('size', sizes as any, 'default'),
      showArrow: boolean('showArrow', false),
      showSearch: boolean('showSearch', false),
      onChange: action('OnChange'),
      style: { width: '100%' },
      children: values.map(opt => <Option value={opt}>{opt}</Option>),
    };
  },

  multipleMode: {
    style: {
      width: '100%',
    },
    mode: 'multiple',
    defaultValue: 'a10',
    onChange: action('OnChange'),
    children,
  },
  withMultiselect: {
    style: {
      width: '100%',
    },
    defaultValue: 'lucy',
    onChange: action('OnChange'),
    children: [
      <OptGroup label="Manager">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
      </OptGroup>,
      <OptGroup label="Engineer">
        <Option value="Yiminghe">Adam</Option>
      </OptGroup>,
    ],
  },
  empty: () => ({
    style: { width: '100%' },
  }),
};

export default {
  name: 'Components|Select|Basic',
  decorator,
  stories,
  Component: Select,
};
