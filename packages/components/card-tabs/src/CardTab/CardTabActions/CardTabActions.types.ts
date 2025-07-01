import { type MouseEvent } from 'react';

import { type CardTabTexts } from '../CardTab.types';

export type CardTabActionsProps = {
  onChangeName?: (event?: MouseEvent<HTMLElement>) => void;
  /** @deprecated */
  enterEditNameMode?: (event?: MouseEvent<HTMLElement>) => void;
  onDuplicateTab?: (event?: MouseEvent<HTMLElement>) => void;
  onRemoveTab?: (event?: MouseEvent<HTMLElement>) => void;
  onPreviewTab?: () => void;
  texts?: CardTabTexts;
};
