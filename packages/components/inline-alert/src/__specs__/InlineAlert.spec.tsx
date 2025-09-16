import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';
import InlineAlert from '../InlineAlert';


describe('Alert component', () => {

  it('should render message', () => {
    const message = "Success description";
    renderWithProvider(<InlineAlert type='warning' message={message}/>);

    expect(screen.getByText(message)).toBeTruthy();
  });

  it('should render with showMoreLabel', () => {

    const message = "Success description";
    const withLink = "Show more";
    renderWithProvider(<InlineAlert type='warning' message={message} withLink={withLink} />);

    expect(screen.getByText(message)).toBeTruthy();
    expect(screen.getByText(withLink)).toBeTruthy();
  });
})
