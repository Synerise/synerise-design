import type { GroupProps } from 'antd/es/input';

import { type FormFieldCommonProps } from '@synerise/ds-form-field';

export type Props = GroupProps & {
  errors?: string[];
  resetMargin?: boolean;
} & Omit<FormFieldCommonProps, 'errorText'>;
