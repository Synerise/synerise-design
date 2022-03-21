import Collector from '../Collector';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';

const SUGGESTIONS = [{ text: 'Suggestion 1' }, { text: 'Suggestion 2' }, { text: 'Other' }];
const SELECTED = [{ text: 'Suggestion 1' }, { text: 'Other' }];
const PLACEHOLDER = 'Select...';
describe('Collector', () => {
  it('Should render suggestions', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();
    const { getByText, getByPlaceholderText } = renderWithProvider(
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
    getByPlaceholderText(PLACEHOLDER).focus();
    SUGGESTIONS.map(s => expect(getByText(s['text'])).toBeTruthy());
  });
  it('Should render selected values', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    const { getByText } = renderWithProvider(
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
    SELECTED.map(s => expect(getByText(s['text'])).toBeTruthy());
  });
  it('Should render added value', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    const newValue = 'That is new!';
    const { getByText, getByPlaceholderText } = renderWithProvider(
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
    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: newValue } });
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
    expect(getByText(newValue)).toBeTruthy();
  });
  it('Should call onConfirm', () => {
    const onConfirmFn = jest.fn();
    const onSelectFn = jest.fn();

    const { getByText, container } = renderWithProvider(
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
    const addButton = getByText('Add') as HTMLElement;
    addButton.click();
    expect(onConfirmFn).toBeCalledTimes(1);
    expect(onConfirmFn).toBeCalledWith(SELECTED);
  });

  it('Should call onCancel', () => {
    const onConfirmFn = jest.fn();
    const onCancelFn = jest.fn();
    const onSelectFn = jest.fn();
    const { getByText } = renderWithProvider(
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
    const cancelButton = getByText('Cancel') as HTMLElement;
    cancelButton.click();
    expect(onCancelFn).toBeCalledTimes(1);
  });

  it.todo('should render initially selected options (note that when !allowMultipleValues` selected will be always initially [], should respect selected values from the e.g. API')
  it('should take into consideration suggestions prop with filtered results based on `selected` when rendering suggestions', () => {
      const availableEntries = [{text: 'Option A1'}, {text: 'Option A2'}]
      const selected = [{text: 'Option A1'}]
      // note includes won't work here
      console.assert(availableEntries.find(selected), 'wrong test setup')
      const suggestions = React.useMemo(() => {
          return availableEntries.filter(... selected ...)
      })
      const {component} = renderWithProvider(<Collector selected={} suggestions={suggestions}>
      </Collector>)
      expect(component.querySelector('.suggestions')).notToContainChild(selected[0])
  })
});
