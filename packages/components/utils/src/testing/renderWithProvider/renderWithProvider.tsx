import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { DSProvider } from '@synerise/ds-core';

type Options = Omit<RenderOptions, 'queries'>;

const renderWithProvider = (node: React.ReactElement, options?: Options): RenderResult => {
  const rendered = render(<DSProvider>{node}</DSProvider>, options);
  return {
    ...rendered,
    rerender: (ui: React.ReactElement, opt?: Options): RenderResult =>
      renderWithProvider(ui, { container: rendered.container, ...opt }),
  };
};

export default renderWithProvider;
