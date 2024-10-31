import type { CardTabTexts, ListItemEventType } from '../CardTab.types';

export type CardTabDropdownProps = {
  editNameHandler?: (event: ListItemEventType) => void;
  duplicateHandler?: (event: ListItemEventType) => void;
  removeHandler?: (event: ListItemEventType) => void;
  texts: CardTabTexts;
};
