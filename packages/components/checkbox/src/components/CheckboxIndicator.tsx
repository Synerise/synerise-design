import React from 'react';

import * as S from '../Checkbox.styles';
import type { CheckboxIndicatorProps } from '../Checkbox.types';
import { cx } from '../utils';

export const CheckboxIndicator = ({
  checked,
  indeterminate,
  disabled,
  hasError,
  className,
}: CheckboxIndicatorProps) => (
  <S.CheckboxInner
    className={cx('ant-checkbox-inner', 'ds-checkbox-inner', className)}
    $checked={Boolean(checked)}
    $indeterminate={Boolean(indeterminate)}
    $disabled={Boolean(disabled)}
    $error={Boolean(hasError)}
  >
    <S.CheckIcon viewBox="3 3 18 18" aria-hidden="true">
      <path d="M10.61 15.744a.75.75 0 01-.535-.224l-3.11-3.162a.75.75 0 011.07-1.052l2.575 2.618 5.355-5.444a.75.75 0 111.07 1.052l-5.89 5.988a.75.75 0 01-.535.224z" />
    </S.CheckIcon>
  </S.CheckboxInner>
);
