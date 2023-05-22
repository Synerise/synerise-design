import { useContext } from 'react';

import { DataFormatIntlsContext } from '../contexts';
import { DataFormatIntls } from '../types';

export const useDataFormatIntls = (): DataFormatIntls => {
  return useContext(DataFormatIntlsContext);
};
