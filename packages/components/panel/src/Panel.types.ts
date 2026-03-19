import { type BoxProps } from '@synerise/ds-flex-box';
import { type BaseLabelProps } from '@synerise/ds-form-field';

export type PanelProps = Omit<BoxProps, 'label'> &
  BaseLabelProps & {
    radius?: number;
    greyBackground?: boolean;
  };
