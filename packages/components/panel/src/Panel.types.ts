import { type BoxProps } from '@synerise/ds-flex-box';
import { type FormFieldLabelProps } from '@synerise/ds-form-field';

export type PanelProps = BoxProps &
  Pick<FormFieldLabelProps, 'label' | 'tooltip' | 'tooltipConfig'> & {
    radius?: number;
    greyBackground?: boolean;
    id?: string;
  };
