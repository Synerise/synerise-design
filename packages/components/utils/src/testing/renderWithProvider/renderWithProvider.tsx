import React, { type ReactNode } from 'react';

import { DSProvider, type DSProviderProps } from '@synerise/ds-core';
import {
  type DataFormatNotationType,
  getDataFormatConfigFromNotation,
} from '@synerise/ds-data-format';
import {
  type RenderOptions,
  type RenderResult,
  render,
} from '@testing-library/react';

import { NOOP } from '../../index';

type Options = Omit<RenderOptions, 'queries'>;

const renderWithProvider = (
  node: ReactNode,
  options?: Options,
  props?: Partial<Omit<DSProviderProps, 'onErrorIntl' | 'dataFormatConfig'>> & {
    notation?: DataFormatNotationType;
  },
): RenderResult => {
  const { notation, ...providerProps } = props || {};
  const rendered = render(
    <DSProvider
      onErrorIntl={NOOP}
      {...(notation
        ? { dataFormatConfig: getDataFormatConfigFromNotation(notation) }
        : {})}
      {...providerProps}
    >
      {node}
    </DSProvider>,
    options,
  );
  return {
    ...rendered,
    rerender: (ui: ReactNode, opt?: Options): RenderResult =>
      renderWithProvider(ui, { container: rendered.container, ...opt }),
  };
};

export default renderWithProvider;
