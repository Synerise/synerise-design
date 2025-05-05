import React, { ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { DSProvider, DSProviderProps } from '@synerise/ds-core';
import { getDataFormatConfigFromNotation, DataFormatNotationType } from '@synerise/ds-data-format';
import { NOOP } from '../../index';

type Options = Omit<RenderOptions, 'queries'>;

const renderWithProvider = (
  node: ReactNode,
  options?: Options,
  props?: Partial<Omit<DSProviderProps, 'onErrorIntl' | 'dataFormatConfig'>> & {
    notation?: DataFormatNotationType;
  }
): RenderResult => {
  const { notation, ...providerProps} = props || {};
  const rendered = render(
    <DSProvider
      onErrorIntl={NOOP}
      {...(notation ? { dataFormatConfig: getDataFormatConfigFromNotation(notation) } : {})}
      {...providerProps}
    >
      {node}
    </DSProvider>,
    options
  );
  return {
    ...rendered,
    rerender: (ui: ReactNode, opt?: Options): RenderResult =>
      renderWithProvider(ui, { container: rendered.container, ...opt }),
  };
};

export default renderWithProvider;
