import React from 'react';
import SubtleForm from '../SubtleForm';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Subtle Textarea', () => {
  it('should render current value', () => {
    const VALUE = 'Example value';
    const { getByText } = renderWithProvider(<SubtleForm.TextArea value={VALUE} />);
    expect(getByText(VALUE)).toBeTruthy();
  });
  it('should render placeholder', () => {
    const PLACEHOLDER = 'Placeholder';
    const { getByText } = renderWithProvider(<SubtleForm.TextArea placeholder={PLACEHOLDER} />);
    expect(getByText(PLACEHOLDER)).toBeTruthy();
  });
  it('should render label', () => {
    const LABEL = 'LABEL';
    const { getByText } = renderWithProvider(<SubtleForm.TextArea label={LABEL} />);
    expect(getByText(LABEL)).toBeTruthy();
  });
  it('should not render label container before textarea container if not provided a label', () => {
    const { container } = renderWithProvider(<SubtleForm.TextArea label="description"/>);
    const textAreaAsFirstChild = container.querySelector('.ds-subtle-form .ds-subtle-textarea:first-child')
    expect(textAreaAsFirstChild).toBeFalsy();
    const { container: containerNoLabel } = renderWithProvider(<SubtleForm.TextArea/>);
    expect(containerNoLabel.querySelector('.ds-subtle-form .ds-subtle-textarea:first-child')).toBeTruthy();
  });
  it('should call onChange', async () => {
    
    const onChange = jest.fn();
    const oldValue = 'VALUE';
    const newValue = 'HELLO';
    const { getByDisplayValue, container } = renderWithProvider(
      <SubtleForm.TextArea value={oldValue} onChange={onChange} />
    );
    
    const textarea = getByDisplayValue(oldValue) as HTMLInputElement;
    fireEvent.click(textarea);
    const input = container.querySelector('.ant-input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: newValue } });
    await waitFor(() => expect(onChange).toBeCalledWith(newValue));
  });
});
