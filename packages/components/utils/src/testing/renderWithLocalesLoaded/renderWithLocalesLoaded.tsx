import React, { ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { DSProvider } from '@synerise/ds-core';
import { getDataFormatConfigFromNotation, DataFormatNotationType } from '@synerise/ds-data-format';
import renderWithProvider from '../renderWithProvider/renderWithProvider';
import { NOOP } from '../../index';

type Options = Omit<RenderOptions, 'queries'>;

const renderWithLocalesLoaded = (
  node: ReactNode,
  options?: Options,
  props?: {
    locale?: string;
    notation?: DataFormatNotationType;
    timeZone?: string;
  }
): Promise<RenderResult> => {
  return new Promise(resolve => {
    const onDSLocalesLoaded = () =>
      resolve({
        ...rendered,
        rerender: (ui: ReactNode, opt?: Options): RenderResult =>
          renderWithProvider(ui, { container: rendered.container, ...opt }),
      });
    const rendered = render(
      <DSProvider
        locale={props?.locale ?? undefined}
        onErrorIntl={NOOP}
        onDSLocalesLoaded={onDSLocalesLoaded}
        timeZone={props?.timeZone ?? undefined}
        {...(props?.notation ? { dataFormatConfig: getDataFormatConfigFromNotation(props.notation) } : {})}
      >
        {node}
      </DSProvider>,
      options
    );
  });
};

export default renderWithLocalesLoaded;
