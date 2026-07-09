import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import SubtleForm from '../SubtleForm';

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
    const { rerender } = renderWithProvider(
      <SubtleForm.TextArea label={LABEL} />,
    );
    expect(screen.getByText(LABEL)).toBeTruthy();
    rerender(<SubtleForm.TextArea />);
    expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
  });
  it('should call onChange', async () => {
    const onChange = vi.fn();
    const oldValue = 'VALUE';
    const newValue = 'HELLO';
    const { getByDisplayValue, container } = renderWithProvider(
      <SubtleForm.TextArea value={oldValue} onChange={onChange} />,
    );

    const valueArea = getByDisplayValue(oldValue) as HTMLElement;
    fireEvent.click(valueArea);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.focus(textarea);
    fireEvent.change(textarea, { target: { value: newValue } });
    await waitFor(() => expect(onChange).toBeCalledWith(newValue));
  });
});
