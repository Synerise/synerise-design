import React from 'react';

import type {
  ArrayItemType,
  ArrayValueElement,
  FactorValueComponentProps,
  FactorValueType,
} from '../../Factors.types';
import { ArrayFactorBase } from './ArrayFactor';

export const Array = ({
  value,
  onChange,
  texts,
  onActivate,
  onDeactivate,
  readOnly = false,
  error,
  arrayProps = {},
}: FactorValueComponentProps) => (
  <ArrayFactorBase<ArrayItemType>
    value={value as ArrayValueElement<ArrayItemType>[]}
    onChange={(changedValue) => onChange(changedValue as FactorValueType)}
    texts={texts}
    onActivate={onActivate}
    onDeactivate={onDeactivate}
    readOnly={readOnly}
    error={error}
    {...arrayProps}
  />
);
