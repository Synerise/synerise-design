import React, { useCallback, useState, MouseEvent } from 'react';
import copy from 'copy-to-clipboard';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import Icon, { CopyClipboardM } from '@synerise/ds-icon';

import { CopyButtonProps } from '../Array.types';

export const CopyButton = ({ copyValue, texts }: CopyButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState(texts.array.copyTooltip);

  const handleCopy = useCallback(() => {
    if (copyValue && copy(copyValue)) {
      setTooltipTitle(texts.array.copiedTooltip);
      setTooltipVisible(true);
    }
  }, [copyValue, setTooltipTitle, texts.array.copiedTooltip]);

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setTooltipTitle(texts.array.copyTooltip);
      setTooltipVisible(true);
    },
    [setTooltipVisible, texts.array]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setTooltipVisible(false);
    },
    [setTooltipVisible]
  );
  return (
    <Tooltip title={tooltipTitle} visible={tooltipVisible}>
      <Button
        onClick={handleCopy}
        type="ghost"
        mode="single-icon"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon component={<CopyClipboardM />} />
      </Button>
    </Tooltip>
  );
};
