import Collector from '../Collector';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';

const SUGGESTIONS = ['Suggestion 1', 'Suggestion 2', 'Other'];
const SELECTED = ['Suggestion 1', 'Other'];
const PLACEHOLDER = 'Select...';
describe('Collector', () => {
  it('Should render suggestions', () => {
    const onConfirmFn = jest.fn();
    const { getByText, getByPlaceholderText } = renderWithProvider(
      <Collector
        selected={[]}
        suggestions={SUGGESTIONS}
        onConfirm={onConfirmFn}
        texts={{ add: 'Add', cancel: 'Cancel', placeholder: PLACEHOLDER }}
      />
    );
    getByPlaceholderText(PLACEHOLDER).focus();
    SUGGESTIONS.map(s => expect(getByText(s)).toBeTruthy());
  });
  it('Should render selected values', () => {
    const onConfirmFn = jest.fn();
    const { getByText } = renderWithProvider(
      <Collector
        selected={SELECTED}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{ add: 'Add', cancel: 'Cancel', placeholder: PLACEHOLDER }}
      />
    );
    SELECTED.map(s => expect(getByText(s)).toBeTruthy());
  });
  it('Should render added value', () => {
    const onConfirmFn = jest.fn();
    const newValue = 'That is new!';
    const { getByText, getByPlaceholderText } = renderWithProvider(
      <Collector
        selected={[]}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{ add: 'Add', cancel: 'Cancel', placeholder: PLACEHOLDER }}
      />
    );
    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: newValue } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    expect(getByText(newValue)).toBeTruthy();
  });
  it('Should call onConfirm', () => {
    const onConfirmFn = jest.fn();
    const { getByText } = renderWithProvider(
      <Collector
        selected={SELECTED}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{ add: 'Add', cancel: 'Cancel', placeholder: PLACEHOLDER }}
      />
    );
    const addButton = getByText('Add') as HTMLElement;
    addButton.click();
    expect(onConfirmFn).toBeCalledTimes(1);
    expect(onConfirmFn).toBeCalledWith(SELECTED);
  });

  it('Should call onCancel', () => {
    const onConfirmFn = jest.fn();
    const onCancelFn = jest.fn();
    const { getByText } = renderWithProvider(
      <Collector
        selected={SELECTED}
        suggestions={[]}
        onConfirm={onConfirmFn}
        onCancel={onCancelFn}
        texts={{ add: 'Add', cancel: 'Cancel', placeholder: PLACEHOLDER }}
      />
    );
    const cancelButton = getByText('Cancel') as HTMLElement;
    cancelButton.click();
    expect(onCancelFn).toBeCalledTimes(1);
  });
});
