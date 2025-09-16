import { useContext } from 'react';

import { DataFormatIntlsContext } from '../contexts';
import { type DataFormatIntls } from '../types';

export const useDataFormatIntls = (): DataFormatIntls => {
  return useContext(DataFormatIntlsContext);
};
