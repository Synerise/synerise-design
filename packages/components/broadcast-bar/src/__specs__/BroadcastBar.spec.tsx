import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';
import BroadcastBar from '../BroadcastBar';

describe('BroadcastBar component', () => {

  it('should render with description', () => {
    const description = "Description";
    renderWithProvider(<BroadcastBar type='success' description={description}/>);

    expect(screen.getByText(description)).toBeTruthy();
  });

})
