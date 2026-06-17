import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import Typography from '../index';

describe('Typography', () => {
  it('title should render', function () {
    renderWithProvider(<Typography.Title level={3}>HEADER</Typography.Title>);
    expect(screen.getByText('HEADER')).toBeInTheDocument();
  });

  it('forwards style and data-* attributes onto the Title element', () => {
    renderWithProvider(
      <Typography.Title level={2} style={{ margin: 0 }} data-testid="title">
        HEADER
      </Typography.Title>,
    );
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent('HEADER');
    expect(title).toHaveStyle({ margin: '0px' });
  });

  it('forwards style and data-* attributes onto the Text element', () => {
    renderWithProvider(
      <Typography.Text style={{ margin: 0 }} data-testid="text">
        BODY
      </Typography.Text>,
    );
    const text = screen.getByTestId('text');
    expect(text).toHaveTextContent('BODY');
    expect(text).toHaveStyle({ margin: '0px' });
  });

  it('applies style and data-* to the Ellipsis wrapper when ellipsis is set', () => {
    renderWithProvider(
      <Typography.Text
        ellipsis={{ tooltip: 'Full content' }}
        style={{ maxWidth: 200 }}
        data-testid="ellipsis-text"
      >
        BODY
      </Typography.Text>,
    );
    const wrapper = screen.getByTestId('ellipsis-text');
    expect(wrapper).toHaveTextContent('BODY');
    expect(wrapper).toHaveStyle({ maxWidth: '200px' });
  });

  it('forwards style and data-* attributes onto the Paragraph element', () => {
    renderWithProvider(
      <Typography.Paragraph style={{ margin: 0 }} data-testid="paragraph">
        PARA
      </Typography.Paragraph>,
    );
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toHaveTextContent('PARA');
    expect(paragraph).toHaveStyle({ margin: '0px' });
  });
});
