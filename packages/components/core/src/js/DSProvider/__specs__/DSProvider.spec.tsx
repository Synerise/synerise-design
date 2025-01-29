import React from 'react';
import { render, screen } from '@testing-library/react';
import DSProvider from '../DSProvider';
import { FormattedMessage } from 'react-intl';

describe('DSProvider', function() {
  const messages = {
    en: {
      CLICK: 'Click this',
    },
  };
  
  it('should render', function() {
    render(
      <DSProvider locale="en" messages={messages}>
        <div data-testid="wrapper">
          <FormattedMessage id="CLICK" />
        </div>
      </DSProvider>
    );
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
  it('should render translated text', function() {
    render(
      <DSProvider locale="en" messages={messages}>
        <div data-testid="wrapper">
          <FormattedMessage id="CLICK" />
        </div>
      </DSProvider>
    );
    expect(screen.getByText('Click this')).toBeInTheDocument();
  });
  it.todo('index module exports theme as named export');
  it.todo('index module exports theme as the default export');
  it.todo('theme is not reexported as it was exported with `export const default = theme`, but `export default theme`');
});
