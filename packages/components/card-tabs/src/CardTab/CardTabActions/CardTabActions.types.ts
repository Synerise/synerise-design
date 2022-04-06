import * as React from 'react';
import { CardTabTexts } from '../CardTab.types';

export interface Props {
  onChangeName?: (event?: React.MouseEvent<HTMLElement>) => void;
  /** @deprecated */
  enterEditNameMode?: (event?: React.MouseEvent<HTMLElement>) => void;
  onDuplicateTab?: (event?: React.MouseEvent<HTMLElement>) => void;
  onRemoveTab?: (event?: React.MouseEvent<HTMLElement>) => void;
  texts?: CardTabTexts;
}
