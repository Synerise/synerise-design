import { MouseEvent } from 'react';
import { CardTabTexts } from '../CardTab.types';

export interface Props {
  onChangeName?: (event?: MouseEvent<HTMLElement>) => void;
  /** @deprecated */
  enterEditNameMode?: (event?: MouseEvent<HTMLElement>) => void;
  onDuplicateTab?: (event?: MouseEvent<HTMLElement>) => void;
  onRemoveTab?: (event?: MouseEvent<HTMLElement>) => void;
  texts?: CardTabTexts;
}
