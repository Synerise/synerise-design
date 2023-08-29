import React from 'react';
import Collector from './Collector';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';

const SUGGESTIONS = [{ text: 'Suggestion 1' }, { text: 'Suggestion 2' }, { text: 'Other' }];
const SELECTED = [{ text: 'Suggestion 1' }, { text: 'Other' }];
const PLACEHOLDER = 'Select...';
describe('Collector', () => {
  it('Should render suggestions', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();
    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        selected={[]}
        searchValue={''}
        suggestions={SUGGESTIONS}
        onConfirm={onConfirmFn}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    screen.getByPlaceholderText(PLACEHOLDER).focus();
    SUGGESTIONS.map(s => expect(screen.getByText(s['text'])).toBeInTheDocument());
  });
  it('Should render selected values', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        selected={SELECTED}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    SELECTED.map(s => expect(screen.getByText(s['text'])).toBeTruthy());
  });
  it('Should render added value', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    const newValue = 'That is new!';
    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        onItemAdd={value => ({ text: value })}
        selected={[]}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: newValue } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    expect(screen.getByText(newValue)).toBeInTheDocument();
  });
  it('Should render multiple added values', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    const newValue1 = 'That is new!';
    const newValue2 = 'That is new!';
    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        onItemAdd={value => ({ text: value })}
        selected={[]}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: newValue1 } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    
    fireEvent.change(input, { target: { value: newValue2 } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    
    expect(screen.getByText(newValue1)).toBeInTheDocument();
    expect(screen.getByText(newValue2)).toBeInTheDocument();
  });
  it('Should call onConfirm', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        searchValue="search val "
        selected={SELECTED}
        suggestions={[]}
        onConfirm={onConfirmFn}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    const addButton = screen.getByText('Add') as HTMLElement;
    addButton.click();
    expect(onConfirmFn).toBeCalledTimes(1);
    expect(onConfirmFn).toBeCalledWith(SELECTED);
  });

  it('Should call onCancel', () => {
    const onConfirmFn = jest.fn();
    const onCancelFn = jest.fn();
    const onSelectFn = jest.fn();
    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        selected={SELECTED}
        suggestions={[]}
        onConfirm={onConfirmFn}
        onCancel={onCancelFn}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    const cancelButton = screen.getByText('Cancel') as HTMLElement;
    cancelButton.click();
    expect(onCancelFn).toBeCalledTimes(1);
  });
  it.todo('should call onYReachEnd function');
  it.todo('should shows loading state on dropdown');
});
