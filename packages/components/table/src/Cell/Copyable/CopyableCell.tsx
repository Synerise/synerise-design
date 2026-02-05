import React, { useEffect, useState } from 'react';

import CopyIcon from '@synerise/ds-copy-icon';

import * as S from './Copyable.styles';
import { type CopyableCellProps } from './Copyable.types';

const DEFAULT_TIMEOUT = 2000;

const CopyableCell = ({
  value,
  confirmMessage,
  tooltipTimeout = DEFAULT_TIMEOUT,
  ...htmlAttributes
}: CopyableCellProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTooltipOpen(false);
    }, tooltipTimeout);
    return (): void => clearTimeout(timer);
  }, [tooltipOpen, setTooltipOpen, tooltipTimeout]);

  return (
    <S.Copyable {...htmlAttributes}>
      <S.CopyableValue>{value}</S.CopyableValue>
      <CopyIcon
        copyValue={value}
        placement="left"
        texts={{ copiedTooltip: confirmMessage }}
      />
    </S.Copyable>
  );
};

export default CopyableCell;
