import React from 'react';

import ColorPicker from '@synerise/ds-color-picker';
import { RawInput } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';

export const data = ['POST', 'GET'];

export const inputGroupOptions = [
  'input',
  'select',
  'inputNumber',
  'colorPicker',
];

const INPUT = <RawInput size="small" placeholder="Placeholder" />;

const INPUT_NUMBER = <InputNumber placeholder="Placeholder" raw />;

const SELECT = (
  <Select
    size="default"
    defaultValue={data[0]}
    placeholder="Placeholder"
    dropdownStyle={{ minWidth: '150px' }}
  >
    {data.map((period) => (
      <Select.Option value={period}>{period}</Select.Option>
    ))}
  </Select>
);

const COLOR_PICKER = <ColorPicker value="#00ffff" placeholder="Placeholder" />;

export const inputGroupType: Array<{
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
  growItem?: 'first' | 'last';
}> = [
  {
    leftComponent: INPUT,
    rightComponent: SELECT,
  },
  {
    leftComponent: SELECT,
    rightComponent: INPUT,
  },
  {
    leftComponent: INPUT,
    rightComponent: INPUT_NUMBER,
  },
  {
    leftComponent: SELECT,
    rightComponent: INPUT_NUMBER,
  },
  {
    leftComponent: INPUT_NUMBER,
    rightComponent: SELECT,
  },
  {
    // ColorPicker's trigger is fixed-width, so it can't fill the group as the
    // last item. `growItem: 'first'` flips the stretch to the leading text input
    // — it fills the row while the picker stays compact on the right, and the
    // group still fills the parent.
    leftComponent: INPUT,
    rightComponent: COLOR_PICKER,
    growItem: 'first',
  },
];

export const inputGroupSelectType = {
  input: INPUT,
  select: SELECT,
  inputNumber: INPUT_NUMBER,
  colorPicker: COLOR_PICKER,
};
