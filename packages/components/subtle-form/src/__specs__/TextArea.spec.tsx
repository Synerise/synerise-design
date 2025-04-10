import React from 'react';
import SubtleForm from '../SubtleForm';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';

describe('Subtle Textarea', () => {
  it('should render current value', () => {
    const VALUE = 'Example value';
    renderWithProvider(<SubtleForm.TextArea value={VALUE} />);
    expect(screen.getByText(VALUE)).toBeTruthy();
  });
  it('should render placeholder', () => {
    const PLACEHOLDER = 'Placeholder';
    renderWithProvider(<SubtleForm.TextArea placeholder={PLACEHOLDER} />);
    expect(screen.getByText(PLACEHOLDER)).toBeTruthy();
  });
  it('should render label', () => {
    const LABEL = 'LABEL';
    renderWithProvider(<SubtleForm.TextArea label={LABEL} />);
    expect(screen.getByText(LABEL)).toBeTruthy();
  });
  it('should not render label container before textarea container if not provided a label', () => {
    const LABEL = 'LABEL';
    const { rerender } = renderWithProvider(<SubtleForm.TextArea label={LABEL} />);
    expect(screen.getByText(LABEL)).toBeTruthy();
    rerender(<SubtleForm.TextArea />);
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
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
