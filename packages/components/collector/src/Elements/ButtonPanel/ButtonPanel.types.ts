import type { ReactNode } from 'react';

import type { CollectorProps, CollectorTexts } from '../../Collector.types';

export type ButtonPanelProps = {
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
  showCancel: boolean;
  texts: CollectorTexts;
  buttonPanelPrefix?: ReactNode;
} & Pick<CollectorProps, 'addButtonProps' | 'cancelButtonProps'>;
