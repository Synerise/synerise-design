import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

import Button from '@synerise/ds-button';

interface CheckboxValue {
  value: boolean;
  required: boolean;
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

const controlledInitialState: CheckboxValue[] = [
  { value: false, required: false },
  { value: true, required: true },
  { value: false, required: false },
];

const stories = {
  Default: () => (
    <Button.Checkbox onChange={action('default change')} />
  ),
  DefaultChecked: () => (
    <Button.Checkbox defaultChecked={true} onChange={action('default checked change')} />
  ),
  Indeterminate: () => (
    <Button.Checkbox indeterminate />
  ),
  Disabled: () => (
    <>
      <Button.Checkbox disabled />
      <Button.Checkbox disabled checked />
      <Button.Checkbox disabled indeterminate />
    </>
  ),
  Error: () => (
    <>
      <Button.Checkbox hasError />
      <Button.Checkbox hasError defaultChecked={true} />
      <Button.Checkbox hasError indeterminate />
    </>
  ),
  Controlled: withState({ values: controlledInitialState })(({ store }) => (
    <>
      <Button.Checkbox
        checked={store.state.values.every(({ value }) => value === true)}
        indeterminate={isIndeterminate(store.state.values)}
        onChange={(isChecked) => { store.set({ values: store.state.values.map(createStateUpdateMap(isChecked)) }) }}
      />
      <hr />
      {store.state.values.map(
        ({ value, required }, index) => (
          <Button.Checkbox
            checked={value}
            hasError={!!required && !value}
            onChange={(isChecked) => {
              store.set({
                values: store.state.values.map(createStateUpdateMap(isChecked, index))
              })
            }}
          />
        )
      )}
    </>
  )),
};

export default {
  name: 'Components/Button/Checkbox',
  stories,
  Component: Button,
};
