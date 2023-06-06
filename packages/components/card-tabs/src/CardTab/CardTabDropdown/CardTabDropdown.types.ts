import { MouseEvent } from 'react';
import { CardTabTexts } from '../CardTab.types';

export interface CardTabDropdownProps {
  editNameHandler?: (event?: MouseEvent<HTMLElement>) => void;
  duplicateHandler?: (event?: MouseEvent<HTMLElement>) => void;
  removeHandler?: (event?: MouseEvent<HTMLElement>) => void;
  texts?: CardTabTexts;
}
