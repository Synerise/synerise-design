import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import SubtleForm from '@synerise/ds-subtle-form';
import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';

import { Cities, renderLabel } from './SubtleForm.data'

import { replaceLettersWithUnderscore } from '@synerise/ds-subtle-form/dist/Elements/DatePicker/utils';
import {
  BOOLEAN_CONTROL,
  fixedWrapper300,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';
import { SelectValue } from 'antd/lib/select';




export default {
  title: "Components/SubtleForm",
  tags: ['autodocs'],
  component: SubtleForm,
  decorators: [fixedWrapper300],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    error: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    disabled: BOOLEAN_CONTROL,
  },
} as Meta<typeof SubtleForm>;

type Story = StoryObj<typeof SubtleForm>;


export const SubtleFormInput: Story = {
  render: (args) => {
    const [name, setName] = useState<string | undefined>();
    return (

      <SubtleForm.Input
        {...args}
        inputProps={{}}
        value={name}
        onChange={setName}
        placeholder={'Name'}
        label={renderLabel('Name')}
        labelTooltip={'Name'}
        suffixTooltip={'Edit'}
      />

    );
  },
  args: {
    disabled: false,
    error: false,
    errorText: '',
  },
};

export const SubtleFormCustomField: Story = {
  render: (args) => {
    const [value, setValue] = useState<number>();
    const [active, setActive] = useState(false);
    const placeholder = 'Number';
    return (
      <SubtleForm.Field
        {...args}
        value={value}
        active={active}
        activeElement={() => (
          <InputNumber
            autoFocus
            value={value}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={newValue => setValue(newValue)}
            placeholder={placeholder}
            error={args.error}
            errorText={args.errorText}
          />
        )}
        inactiveElement={() => <>{value || placeholder}</>}
        label={renderLabel('Number')}
        labelTooltip={'Number'}
      />
    );
  },
  args: {
    disabled: false,
    error: false,
    errorText: '',
  },
};

export const SubtleFormSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<SelectValue>();

    return (
      <SubtleForm.Select
        {...args}
        onChange={val => setValue(val)}
        value={value}
        placeholder={'City'}
        label={renderLabel('City')}
        labelTooltip={'City'}
        suffixTooltip={'Select'}
      >
        {Cities.map(c => (
          <Select.Option value={c}>{c}</Select.Option>
        ))}
      </SubtleForm.Select>

    );
  },
  args: {
    disabled: false,
    error: false,
    errorText: '',
  },
};

export const SubtleFormDatePicker: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date>();
    const [open, setOpen] = useState(false);

    const format = 'dd-MM-yyyy';
    return (

      <SubtleForm.DatePicker
        {...args}
        autoFocus
        format={format}
        onApply={val => setValue(val)}
        onClear={() => {
          setValue(undefined);
        }}
        value={value}
        placeholder={'Date'}
        label={renderLabel('Date')}
        labelTooltip={'Date'}
        suffixTooltip={'Select date'}
        onDropdownVisibleChange={setOpen}
        dropdownProps={{ align: { offset: [0, 8] } }}
        activeProp={open}
        texts={
          {
            inputPlaceholder: replaceLettersWithUnderscore(format),
            clearTooltip: 'Clear',
          } as any
        }
      />

    );
  },
  args: {
    disabled: false,
    error: false,
    errorText: '',
  },
};

export const SubtleFormTextArea: Story = {
  render: (args) => {
    const [description, setDescription] = useState<string | undefined>();
    return <SubtleForm.TextArea
      {...args}
      minRows={3}
      value={description}
      onChange={setDescription}
      placeholder={'Description'}
      label={renderLabel('Description')}
      labelTooltip={'Description'}
      suffixTooltip={'Edit'}
    />
  },
  args: {
    disabled: false,
    error: false,
    errorText: '',
  },
};