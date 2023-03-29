import { useContext } from 'react';

import { DataFormatConfigContext } from '../contexts';
import { DataFormatConfig } from '../types';

export const useDataFormatConfig = (): DataFormatConfig => {
  return useContext(DataFormatConfigContext);
};
