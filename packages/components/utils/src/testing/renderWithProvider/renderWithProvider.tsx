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
    applyTimeZoneOffset?: boolean;
  },
): RenderResult => {
  const { notation, applyTimeZoneOffset, ...providerProps } = props || {};
  const dataFormatConfigProps =
    applyTimeZoneOffset !== undefined || notation
      ? {
          ...(notation ? getDataFormatConfigFromNotation(notation) : {}),
          applyTimeZoneOffset,
        }
      : {};

  const rendered = render(
    <DSProvider
      onErrorIntl={NOOP}
      dataFormatConfig={dataFormatConfigProps}
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
