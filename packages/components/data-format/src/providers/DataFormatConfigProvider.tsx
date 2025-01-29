import React, { ReactNode } from 'react';

import { DataFormatConfig } from '../types';
import { DataFormatConfigContext, DataFormatIntlsContext } from '../contexts';
import { DEFAULT_DATA_FORMAT_CONFIG } from '../constants';
import { useDataFormatUtils, useSingleIntl } from '../hooks';

export type DataFormatConfigProviderProps = {
  dataFormatConfig?: DataFormatConfig;
  children?: ReactNode;
};

export const DataFormatConfigProvider = ({
  dataFormatConfig: dataFormatConfigFromProps,
  children,
}: DataFormatConfigProviderProps) => {
  const dataFormatConfig = dataFormatConfigFromProps ?? DEFAULT_DATA_FORMAT_CONFIG;
  const { getLocaleFromNotation } = useDataFormatUtils();

  const { intl: numberFormatIntl } = useSingleIntl(getLocaleFromNotation(dataFormatConfig?.numberFormatNotation));
  const { intl: dateFormatIntl } = useSingleIntl(getLocaleFromNotation(dataFormatConfig?.dateFormatNotation));
  const { intl: timeFormatIntl } = useSingleIntl(getLocaleFromNotation(dataFormatConfig?.timeFormatNotation));

  return (
    <DataFormatIntlsContext.Provider value={{ numberFormatIntl, dateFormatIntl, timeFormatIntl }}>
      <DataFormatConfigContext.Provider value={dataFormatConfig}>{children}</DataFormatConfigContext.Provider>
    </DataFormatIntlsContext.Provider>
  );
};
