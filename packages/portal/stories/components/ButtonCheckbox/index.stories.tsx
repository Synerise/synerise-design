import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Button from '@synerise/ds-button';
import { boolean } from '@storybook/addon-knobs';

interface CheckboxValue {
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

const controlledInitialState: CheckboxValue[] = [
  { value: false },
  { value: true },
  { value: false },
];

const stories = {
  default: () => (
    <Button.Checkbox
      checked={boolean('checked', undefined)}
      disabled={boolean('disabled', undefined)}
      hasError={boolean('hasError', undefined)}
      indeterminate={boolean('indeterminate', undefined)}
      onChange={action('onChange')}
    />
  ),
  defaultChecked: () => (
    <Button.Checkbox
      checked={boolean('checked', undefined)}
      defaultChecked={boolean('defaultChecked', true)}
      disabled={boolean('disabled', undefined)}
      hasError={boolean('hasError', undefined)}
      indeterminate={boolean('indeterminate', undefined)}
      onChange={action('onChange')}
    />
  ),
  controlled: withState({ values: controlledInitialState })(({ store }) => (
    <>
      <Button.Checkbox
        checked={store.state.values.every(({ value }) => value === true)}
        indeterminate={isIndeterminate(store.state.values)}
        onChange={(isChecked) => { store.set({ values: store.state.values.map(createStateUpdateMap(isChecked)) }) }}
      />
      <hr />
      {store.state.values.map(
        ({ value }, index) => (
          <Button.Checkbox
            checked={value}
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
  name: 'Components/Button/ButtonWithSymbols/WithCheckbox',
  stories,
  Component: Button,
};
