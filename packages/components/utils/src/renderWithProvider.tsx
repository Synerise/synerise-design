import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { DSProvider } from '@synerise/ds-core';

type Options = Omit<RenderOptions, 'queries'>;
const renderWithProvider = (node: React.ReactElement, options?: Options) => {
  const rendered = render(<DSProvider code="en_GB">{node}</DSProvider>, options);
  return {
    ...rendered,
    rerender: (ui: any, options: Options) => renderWithProvider(ui, { container: rendered.container, ...options }),
  };
};

export default renderWithProvider;
