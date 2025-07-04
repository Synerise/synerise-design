import copy from 'copy-to-clipboard';
import React, {
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Icon, { CopyClipboardM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Copyable.styles';
import { type CopyableCellProps } from './Copyable.types';

const DEFAULT_TIMEOUT = 2000;

const CopyableCell = ({
  value,
  confirmMessage,
  tooltipTimeout = DEFAULT_TIMEOUT,
  ...htmlAttributes
}: CopyableCellProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTooltipVisible(false);
    }, tooltipTimeout);
    return (): void => clearTimeout(timer);
  }, [tooltipVisible, setTooltipVisible, tooltipTimeout]);

  const handleCopy = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (copy(value)) {
        setTooltipVisible(true);
      }
    },
    [value],
  );

  return (
    <S.Copyable {...htmlAttributes}>
      <span>{value}</span>
      <Tooltip visible={tooltipVisible} title={confirmMessage} placement="left">
        <Icon onClick={handleCopy} component={<CopyClipboardM />} />
      </Tooltip>
    </S.Copyable>
  );
};

export default CopyableCell;
