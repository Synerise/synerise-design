import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { DSProvider } from '@synerise/ds-core';
import { getDataFormatConfigFromNotation, DataFormatNotationType } from '@synerise/ds-data-format';

type Options = Omit<RenderOptions, 'queries'>;

const renderWithProvider = (
  node: React.ReactElement,
  options?: Options,
  props?: {
    locale?: string;
    notation?: DataFormatNotationType;
  }
): RenderResult => {
  const rendered = render(
    <DSProvider
      locale={props?.locale ?? undefined}
      {...(props?.notation ? { dataFormatConfig: getDataFormatConfigFromNotation(props.notation) } : {})}
    >
      {node}
    </DSProvider>,
    options
  );
  return {
    ...rendered,
    rerender: (ui: React.ReactElement, opt?: Options): RenderResult =>
      renderWithProvider(ui, { container: rendered.container, ...opt }),
  };
};

export default renderWithProvider;
