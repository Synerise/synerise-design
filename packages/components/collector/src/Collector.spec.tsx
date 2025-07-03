import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import {
  createEvent,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Collector from './Collector';

const SUGGESTIONS = [
  { text: 'Suggestion 1' },
  { text: 'Suggestion 2' },
  { text: 'Other' },
];
const SELECTED = [{ text: 'Suggestion 1' }, { text: 'Other' }];
const PLACEHOLDER = 'Select...';
afterEach(() => {
  jest.clearAllMocks();
});
describe('Collector', () => {
  const onMultipleSelectFn = jest.fn();
  const onConfirmFn = jest.fn();
  const onCancelFn = jest.fn();
  const onSelectFn = jest.fn();

  it('Should render suggestions', async () => {
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
      />,
    );
    userEvent.click(screen.getByPlaceholderText(PLACEHOLDER));
    await waitFor(
      () => {
        SUGGESTIONS.map((s) =>
          expect(screen.getByText(s['text'])).toBeInTheDocument(),
        );
      },
      { timeout: 500 },
    );
  });


  it('Should render buttonPanelPrefix', async () => {
    const BUTTON_PANEL_PREFIX = 'BUTTON_PANEL_PREFIX'
    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        selected={[]}
        searchValue={''}
        suggestions={SUGGESTIONS}
        onConfirm={onConfirmFn}
        buttonPanelPrefix={BUTTON_PANEL_PREFIX}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />
    );
    expect(screen.getByText(BUTTON_PANEL_PREFIX)).toBeInTheDocument();
  });
  
  it('Should render selected values', () => {
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
      />,
    );
    SELECTED.map((s) => expect(screen.getByText(s['text'])).toBeTruthy());
  });

  it('Should call onSelectFn when added values', () => {
    const newValue1 = 'That is new!';
    const newValue2 = 'That is also new!';
    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        onItemSelect={onSelectFn}
        onItemAdd={(value) => ({ text: value })}
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
      />,
    );
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    input.focus();
    fireEvent.input(input, { target: { value: newValue1 } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    expect(onSelectFn).toBeCalledTimes(1);
    expect(onSelectFn).toBeCalledWith({ text: newValue1 });

    fireEvent.input(input, { target: { value: newValue2 } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    expect(onSelectFn).toBeCalledTimes(2);
    expect(onSelectFn).toBeCalledWith({ text: newValue2 });
  });

  it('Should call onMultipleSelectFn when multiple pasted values', async () => {
    const newValue1 = 'That is new!';
    const newValue2 = 'That is also new!';
    const separator = ';';
    const itemAdd = (value) => ({ text: value });
    const pastedValue = newValue1 + separator + newValue2;
    const expectedResult = [itemAdd(newValue1), itemAdd(newValue2)];

    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        allowPaste
        onMultipleItemsSelect={onMultipleSelectFn}
        valuesSeparator={separator}
        onItemSelect={onSelectFn}
        onItemAdd={itemAdd}
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
      />,
    );
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const pasteEvent = createEvent.paste(input, {
      clipboardData: {
        getData: () => pastedValue,
      },
    });

    fireEvent(input, pasteEvent);
    expect(onMultipleSelectFn).toHaveBeenCalledWith(expectedResult);
  });

  it('Should not call onItemSelect or onMultipleItemsSelect when pasted string does not contain separator', async () => {
    const itemAdd = (value) => ({ text: value });
    const pastedValue = 'Other';
    const separator = ';';

    renderWithProvider(
      <Collector
        allowCustomValue
        allowMultipleValues
        allowPaste
        onMultipleItemsSelect={onMultipleSelectFn}
        valuesSeparator={separator}
        onItemSelect={onSelectFn}
        onItemAdd={itemAdd}
        selected={[]}
        searchValue={''}
        suggestions={SUGGESTIONS}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: PLACEHOLDER,
          toSelect: 'to select',
          toNavigate: 'to navigate',
        }}
      />,
    );
    const input = screen.getByPlaceholderText(PLACEHOLDER);
    const pasteEvent = createEvent.paste(input, {
      clipboardData: {
        getData: () => pastedValue,
      },
    });

    fireEvent(input, pasteEvent);
    expect(onMultipleSelectFn).not.toHaveBeenCalled();
    expect(onSelectFn).not.toHaveBeenCalled();
  });

  it('Should call onConfirm', () => {
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
      />,
    );
    const addButton = screen.getByText('Add') as HTMLElement;
    addButton.click();
    expect(onConfirmFn).toBeCalledTimes(1);
    expect(onConfirmFn).toBeCalledWith(SELECTED);
  });

  it('Should call onCancel', () => {
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
      />,
    );
    const cancelButton = screen.getByText('Cancel') as HTMLElement;
    cancelButton.click();
    expect(onCancelFn).toBeCalledTimes(1);
  });
  it.todo('should call onYReachEnd function');
  it.todo('should shows loading state on dropdown');
});
