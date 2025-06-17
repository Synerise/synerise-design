import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import type { CheckboxButtonProps } from '@synerise/ds-button';
import { action } from 'storybook/actions';

import { useArgs } from 'storybook/preview-api';
import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL } from '../../utils';

const meta: Meta<CheckboxButtonProps> = {
  title: 'Components/Button/WithCheckbox',
  tags: ['autodocs'],
  render: (args) => {

    const [{ checked }, updateArgs] = useArgs();

    function onChange(isChecked: boolean) {
      args.onClick && args.onClick();
      updateArgs({ checked: isChecked });
    }

    return (
      <Button.Checkbox
        {...args}
        checked={checked}
        onChange={onChange}
      />
    )
  },
  component: Button.Checkbox,
  argTypes: {
    checked: BOOLEAN_CONTROL,
    hasError: BOOLEAN_CONTROL,
    defaultChecked: BOOLEAN_CONTROL,
    indeterminate: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL
  },
};

export default meta;

export const Checkbox: StoryObj<CheckboxButtonProps> = {
  args: {
    onChange: (checked: boolean) => {
      action('onChange')(checked)
    }
  }
}

type CheckboxValue = {
  value: boolean;
}
const isIndeterminate = (values: CheckboxValue[]): boolean => {
  const trueValuesCount = values.filter(({ value }) => !!value).length;
  return trueValuesCount > 0 && trueValuesCount < values.length;
}
const createStateUpdateMap = (newValue: boolean, itemIndex?: number) => ({ value, ...rest }: CheckboxValue, mapIndex: number): CheckboxValue => {
  if (itemIndex !== undefined) {
    return mapIndex === itemIndex ? ({ ...rest, value: newValue }) : ({ ...rest, value });
  }

  return ({ ...rest, value: newValue });
};

export const CheckboxControlled: StoryObj<CheckboxButtonProps> = {
  render: (args) => {
    const [values, setValues] = useState<CheckboxValue[]>([
      { value: false },
      { value: true },
      { value: false },
    ]);
    const onChangeBatch = (isChecked: boolean) => {
      setValues(values.map(createStateUpdateMap(isChecked)))
    };

    const onChangeSingle = (isChecked: boolean, index: number) => {
      setValues(values.map(createStateUpdateMap(isChecked, index)));
    }

    return (
      <>
        <Button.Checkbox
          {...args}
          checked={values.every(({ value }) => value === true)}
          indeterminate={isIndeterminate(values)}
          onChange={onChangeBatch}
        />
        <hr />
        {values.map(
          ({ value }, index) => (
            <Button.Checkbox
              {...args}
              checked={value}
              onChange={(isChecked: boolean) => onChangeSingle(isChecked, index)}
            />
          )
        )}
      </>
    )
  },
  argTypes: {
    checked: {
      table: {
        disable: true
      }
    },
    defaultChecked: {
      table: {
        disable: true
      }
    },
    indeterminate: {
      table: {
        disable: true
      }
    },
  }
}
