import React from 'react';
import { RawInput } from '@synerise/ds-input';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';


export const data = ['POST', 'GET'];

export const inputGroupOptions = ['input', 'select', 'inputNumber'];

const INPUT =
  <RawInput
    size="small"
    placeholder='Placeholder'
  />;

const INPUT_NUMBER =
  <InputNumber
    placeholder='Placeholder'
    raw
  />

const SELECT =
  <Select
    size='default'
    defaultValue={data[0]}
    placeholder='Placeholder'
    dropdownStyle={{ minWidth: '150px' }}
  >
    {data.map(period => (
      <Select.Option value={period}>
        {period}
      </Select.Option>
    ))}
  </Select>;


export const inputGroupType = [
  {
    leftComponent: INPUT,
    rightComponent: SELECT,
  },
  {
    leftComponent:SELECT,
    rightComponent:INPUT,
  },
  {
    leftComponent:INPUT,
    rightComponent:INPUT_NUMBER,
  },
  {
    leftComponent:SELECT,
    rightComponent:INPUT_NUMBER,
  },
  {
    leftComponent: INPUT_NUMBER,
    rightComponent:SELECT,

  },
];

export const inputGroupSelectType =
  {
    input: INPUT,
    select: SELECT,
    inputNumber:INPUT_NUMBER,
  };



