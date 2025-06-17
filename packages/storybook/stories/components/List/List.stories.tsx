import React, { useState } from 'react';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';

import List, { ListPropsType, TextProps } from '@synerise/ds-list';
import Checkbox from '@synerise/ds-checkbox';
import Radio from '@synerise/ds-radio';
import Switch from '@synerise/ds-switch';
import Icon, { FileM } from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  fixedWrapper588,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STYLE_ARG_CONTROL,
  STRING_CONTROL,
  PREFIXCLS_ARG_CONTROL,
} from '../../utils';
import { actions, dataCheckboxes, dataMultiple, dataSingle } from './List.data';

type ItemProps = TextProps & { text: string };
type Story = StoryObj<ListPropsType<ItemProps>>;

export default {
  title: 'Components/List',
  tags: ['autodocs'],
  component: List,
  decorators: [fixedWrapper588],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    bordered: BOOLEAN_CONTROL,
    dashed: BOOLEAN_CONTROL,
    radio: BOOLEAN_CONTROL,
    split: BOOLEAN_CONTROL,
    id: STRING_CONTROL,
    loadMore: REACT_NODE_AS_STRING,
    prefixCls: PREFIXCLS_ARG_CONTROL,
  },
  args: {},
} as Meta<ListPropsType<ItemProps>>;

export const Default: Story = {
  args: {
    header: 'Folders',
    dataSource: dataSingle,
    renderItem: (item: ItemProps) => (
      <List.Item
        onSelect={action('onSelect')}
        icon={<Icon component={<FileM />} />}
        disabled={item.disabled}
        danger={item.danger}
        size={'medium'}
      >
        {item.text}
      </List.Item>
    ),
  },
};
export const ComplexList: Story = {
  args: {
    header: 'Folders',
    dataSource: dataMultiple,
    dashed: false,
    renderItem: (item: ItemProps) => (
      <List.Item
        onSelect={action('onSelect')}
        icon={<Icon component={<FileM />} />}
        disabled={item.disabled}
        danger={item.danger}
        actions={actions()}
        size={'medium'}
      >
        {item.text}
      </List.Item>
    ),
  },
};

type CheckboxProps = { value: string; label: string };
type CheckboxStory = StoryObj<ListPropsType<CheckboxProps>>;

export const withCheckboxes: CheckboxStory = {
  args: {
    header: 'Select option',
    dataSource: dataCheckboxes,
    renderItem: (item: CheckboxProps) => (
      <List.ItemWrapper>
        <Checkbox value={item.value}>{item.label}</Checkbox>
      </List.ItemWrapper>
    ),
  },
};

export const Mixed: Story = {
  render: args => (
    <>
      <List
        dataSource={dataCheckboxes}
        renderItem={(item: CheckboxProps) => (
          <List.ItemWrapper>
            <Checkbox value={item.value}>{item.label}</Checkbox>
          </List.ItemWrapper>
        )}
      />
      <List.Divider />
      <List
        dataSource={dataSingle}
        renderItem={(item: ItemProps) => (
          <List.Item
            onSelect={action('onSelect')}
            icon={<Icon component={<FileM />} />}
            disabled={item.disabled}
            danger={item.danger}
            actions={actions}
            size={'medium'}
          >
            {item.text}
          </List.Item>
        )}
      />
    </>
  ),
};

export const EithRadios: CheckboxStory = {
  args: {
    header: 'Select option',
    dataSource: dataCheckboxes,
    radio: true,
    options: { defaultValue: 'A' },
    renderItem: (item: CheckboxProps) => (
      <List.ItemWrapper>
        <Radio value={item.value}>{item.label}</Radio>
      </List.ItemWrapper>
    ),
  },
};
export const WithSwitches: Story = {
  render: args => {
    const [state, setState] = useState([
      [
        { label: 'Option A', checked: false },
        { label: 'Option B', checked: true },
        { label: 'Option C', checked: false },
        { label: 'Option D', checked: false, errorText: 'This option in recommended' },
      ],
    ]);

    const handleChange = (label: string) => {
      setState(
        state.map(innerArray => {
          return innerArray.map(item => {
            const newCheckedValue = !item.checked;

            if (item.label === 'Option D' && item.label === label) {
              return {
                ...item,
                checked: newCheckedValue,
                ...(newCheckedValue ? { errorText: '' } : { errorText: 'This option in recommended' }),
              };
            }

            if (item.label === label) {
              return { ...item, checked: !item.checked };
            }
            return item;
          });
        })
      );
    };

    return (
      <List
        dataSource={state}
        renderItem={(item: { label: string; errorText?: string; checked: boolean }) => {
          return (
            <List.ItemWrapper>
              <Switch
                label={item.label}
                errorText={item.errorText}
                checked={item.checked}
                onChange={() => handleChange(item.label)}
              />
            </List.ItemWrapper>
          );
        }}
      />
    );
  },
};
