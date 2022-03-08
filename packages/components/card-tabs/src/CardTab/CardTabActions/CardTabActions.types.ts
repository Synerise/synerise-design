import * as React from 'react';
import { CardTabTexts } from '../CardTab.types';

export interface Props {
  enterEditNameMode: (event?: React.MouseEvent<HTMLElement>) => void;
  onDuplicateTab?: (event?: React.MouseEvent<HTMLElement>) => void;
  onRemoveTab?: (event?: React.MouseEvent<HTMLElement>) => void;
  texts?: CardTabTexts;
  actionsAvailable?: {
    editName?: boolean;
    remove?: boolean;
    duplicate?: boolean;
  };
}
