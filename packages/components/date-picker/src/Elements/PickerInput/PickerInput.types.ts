import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import type { DateToFormatOptions } from '@synerise/ds-core';
import type { InputSize } from '@synerise/ds-input';
import type { DataAttributes } from '@synerise/ds-utils';

import type { BaseDatePickerProps } from '../../DatePicker.types';

type InputProps = BaseDatePickerProps['inputProps'];

export type PickerInputProps<ValueType extends Date | string = Date | string> =
  InputProps & {
    autoFocus?: boolean;
    size?: InputSize;
    valueFormatOptions?: DateToFormatOptions;
    showTime?: boolean;
    allowClear?: boolean;
    value?: ValueType;
    /**
     * Set when `value` was handed in as an ISO string, i.e. it is a real instant that has to
     * be rendered in the provider timezone rather than as a plain local date.
     */
    isInstantValue?: boolean;
    onChange?: (
      dateValue: Date | undefined | null,
      stringifiedDate: string,
    ) => void;
    style?: CSSProperties;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    onClick?: () => void;
    onClear?: () => void;
    clearTooltip?: ReactNode;
    highlight?: boolean;
    error?: boolean;
    errorText?: ReactNode;
    prefixel?: ReactNode;
    suffixel?: ReactNode;
    triggerHTMLAttributes?: HTMLAttributes<HTMLDivElement> & DataAttributes;
  };

// @deprecated - use PickerInputProps instead
export type Props = PickerInputProps;
