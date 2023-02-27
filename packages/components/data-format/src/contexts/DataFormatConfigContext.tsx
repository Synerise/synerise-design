import { createContext } from 'react';

import { DEFAULT_DATA_FORMAT_CONFIG } from '../constants';
import { DataFormatConfig } from '../types';

export const DataFormatConfigContext = createContext<DataFormatConfig>(DEFAULT_DATA_FORMAT_CONFIG);
