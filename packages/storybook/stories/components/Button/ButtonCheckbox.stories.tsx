import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { Fragment, useState } from 'react';
import { action } from 'storybook/actions';
import { useArgs } from 'storybook/preview-api';
import styled from 'styled-components';

import type { CheckboxButtonProps } from '@synerise/ds-button';
import Button, { Checkbox as CheckboxButton } from '@synerise/ds-button';
import FormCheckbox from '@synerise/ds-checkbox';

import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL } from '../../utils';
import { NO_SNAPSHOT } from '../../utils/chromatic';

const meta: Meta<CheckboxButtonProps> = {
  title: 'Components/Button/WithCheckbox',
  tags: ['autodocs'],
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    function onChange(isChecked: boolean) {
      args.onClick && args.onClick();
      updateArgs({ checked: isChecked });
    }

    return <Button.Checkbox {...args} checked={checked} onChange={onChange} />;
  },
  component: Button.Checkbox,
  argTypes: {
    checked: BOOLEAN_CONTROL,
    hasError: BOOLEAN_CONTROL,
    defaultChecked: BOOLEAN_CONTROL,
    indeterminate: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
  },
};

export default meta;

export const Checkbox: StoryObj<CheckboxButtonProps> = {
  parameters: {
    ...NO_SNAPSHOT,
    docs: {
      source: {
        code: `<Checkbox onChange={(checked) => console.log(checked)} />`,
      },
    },
  },
  args: {
    onChange: (checked: boolean) => {
      action('onChange')(checked);
    },
  },
};

export const CheckboxDisabled: StoryObj<CheckboxButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button.Checkbox disabled />
      <Button.Checkbox disabled checked />
      <Button.Checkbox disabled indeterminate />
    </div>
  ),
};

type CheckboxValue = {
  value: boolean;
};
const isIndeterminate = (values: CheckboxValue[]): boolean => {
  const trueValuesCount = values.filter(({ value }) => !!value).length;
  return trueValuesCount > 0 && trueValuesCount < values.length;
};
const createStateUpdateMap =
  (newValue: boolean, itemIndex?: number) =>
  ({ value, ...rest }: CheckboxValue, mapIndex: number): CheckboxValue => {
    if (itemIndex !== undefined) {
      return mapIndex === itemIndex
        ? { ...rest, value: newValue }
        : { ...rest, value };
    }

    return { ...rest, value: newValue };
  };

export const CheckboxControlled: StoryObj<CheckboxButtonProps> = {
  parameters: {
    ...NO_SNAPSHOT,
    docs: {
      source: {
        code: `<>
  <Checkbox
    checked={allChecked}
    indeterminate={isIndeterminate}
    onChange={onChangeBatch}
  />
  <hr />
  {values.map((value, index) => (
    <Checkbox
      checked={value}
      onChange={(isChecked) => onChangeSingle(isChecked, index)}
    />
  ))}
</>`,
      },
    },
  },
  render: (args) => {
    const [values, setValues] = useState<CheckboxValue[]>([
      { value: false },
      { value: true },
      { value: false },
    ]);
    const onChangeBatch = (isChecked: boolean) => {
      setValues(values.map(createStateUpdateMap(isChecked)));
    };

    const onChangeSingle = (isChecked: boolean, index: number) => {
      setValues(values.map(createStateUpdateMap(isChecked, index)));
    };

    return (
      <>
        <Button.Checkbox
          {...args}
          checked={values.every(({ value }) => value === true)}
          indeterminate={isIndeterminate(values)}
          onChange={onChangeBatch}
        />
        <hr />
        {values.map(({ value }, index) => (
          <Button.Checkbox
            {...args}
            checked={value}
            onChange={(isChecked: boolean) => onChangeSingle(isChecked, index)}
          />
        ))}
      </>
    );
  },
  argTypes: {
    checked: {
      table: {
        disable: true,
      },
    },
    defaultChecked: {
      table: {
        disable: true,
      },
    },
    indeterminate: {
      table: {
        disable: true,
      },
    },
  },
};

const MATRIX_STATES = [
  { title: 'unchecked', props: {} },
  { title: 'checked', props: { checked: true } },
  { title: 'indeterminate', props: { indeterminate: true } },
  { title: 'error', props: { hasError: true } },
  { title: 'error checked', props: { hasError: true, checked: true } },
  {
    title: 'error indeterminate',
    props: { hasError: true, indeterminate: true },
  },
  { title: 'disabled', props: { disabled: true } },
  { title: 'disabled checked', props: { disabled: true, checked: true } },
  {
    title: 'disabled indeterminate',
    props: { disabled: true, indeterminate: true },
  },
];

const Matrix = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  gap: 8px 24px;
  padding: 16px;
  color: var(--ds-color-text-base-default);
  background-color: var(--ds-color-background-base-default);
`;

/**
 * Button.Checkbox renders the ds-checkbox box, so each state must look the same in both columns.
 */
export const CheckboxMatrix: StoryObj<CheckboxButtonProps> = {
  render: () => (
    <Matrix>
      <span />
      <span>Checkbox</span>
      <span>Button.Checkbox</span>
      {MATRIX_STATES.map(({ title, props }) => (
        <Fragment key={title}>
          <span>{title}</span>
          <FormCheckbox {...props} />
          <CheckboxButton {...props} />
        </Fragment>
      ))}
    </Matrix>
  ),
};

export const CheckboxMatrixHover: StoryObj<CheckboxButtonProps> = {
  ...CheckboxMatrix,
  parameters: { pseudo: { hover: true } },
};

export const CheckboxMatrixDark: StoryObj<CheckboxButtonProps> = {
  ...CheckboxMatrix,
  globals: { dsTheme: 'dark' },
};
