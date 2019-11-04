import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { DSProvider } from '@synerise/ds-core';

type Options = Omit<RenderOptions, 'queries'>;
// eslint-disable-next-line
const renderWithProvider = (node: React.ReactElement, options?: Options) => {
  const rendered = render(<DSProvider>{node}</DSProvider>, options);
  return {
    ...rendered,
    // eslint-disable-next-line
    rerender: (ui: any, options?: Options) => renderWithProvider(ui, { container: rendered.container, ...options }),
  };
};

export default renderWithProvider;
