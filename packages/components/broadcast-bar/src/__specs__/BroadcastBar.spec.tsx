import React from 'react';
import { screen } from '@testing-library/react';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import BroadcastBar from '../BroadcastBar';

describe('BroadcastBar component', () => {
  it('should render with description', () => {
    const description = 'Description';
    renderWithProvider(<BroadcastBar type="success" description={description} />);

    expect(screen.getByText(description)).toBeTruthy();
  });

  it('renders the button wrapper without its own background or radius', () => {
    renderWithProvider(
      <BroadcastBar
        type="success"
        description="Description"
        button={<button type="button">Act</button>}
      />,
    );
    const wrapper = screen.getByRole('button', { name: 'Act' }).parentElement;

    expect(declarationsFor(wrapper, { state: 'any' })).not.toMatch(
      /background|border-radius/,
    );
  });
});
