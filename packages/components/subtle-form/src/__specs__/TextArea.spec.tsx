import * as React from 'react';
import SubtleForm from '../SubtleForm';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Subtle Textarea', () => {
  it('should render current value', () => {
    // ARRANGE
    const VALUE = 'Example value';
    const { getByText } = renderWithProvider(<SubtleForm.TextArea value={VALUE} />);
    // ASSERT
    expect(getByText(VALUE)).toBeTruthy();
  });
  it('should render placeholder', () => {
    // ARRANGE
    const PLACEHOLDER = 'Placeholder';
    const { getByText } = renderWithProvider(<SubtleForm.TextArea placeholder={PLACEHOLDER} />);
    // ASSERT
    expect(getByText(PLACEHOLDER)).toBeTruthy();
  });
  it('should render label', () => {
    // ARRANGE
    const LABEL = 'LABEL';
    const { getByText } = renderWithProvider(<SubtleForm.TextArea label={LABEL} />);
    // ASSERT
    expect(getByText(LABEL)).toBeTruthy();
  });
  it('should call onChange', async () => {
    // ARRANGE
    const onChange = jest.fn();
    const oldValue = 'VALUE';
    const newValue = 'HELLO';
    const { getByDisplayValue, container } = renderWithProvider(
      <SubtleForm.TextArea value={oldValue} onChange={onChange} />
    );
    // ASSERT
    const textarea = getByDisplayValue(oldValue) as HTMLInputElement;
    await fireEvent.click(textarea);
    const input = container.querySelector('.ant-input') as HTMLInputElement;
    await fireEvent.focus(input);
    await fireEvent.change(input, { target: { value: newValue } });
    expect(onChange).toBeCalledWith(newValue);
  });
});
