import copy from 'copy-to-clipboard';
import React, { type MouseEvent, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import Icon, { CopyClipboardM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './CopyIcon.styles';
import { type CopyIconProps, type CopyTooltipTexts } from './CopyIcon.types';

const CopyIcon = ({
  copyValue,
  texts,
  onMouseEnter,
  onMouseLeave,
  icon,
  placement,
  onCopy,
  onClick,
  ...rest
}: CopyIconProps) => {
  const { formatMessage } = useIntl();
  const textsObj: CopyTooltipTexts = useMemo(
    () => ({
      copiedTooltip: formatMessage({
        id: 'DS.COPY-ICON.COPIED',
        defaultMessage: 'Copied!',
      }),
      copyTooltip: formatMessage({
        id: 'DS.COPY-ICON.COPY-VALUE',
        defaultMessage: 'Copy',
      }),
      ...texts,
    }),
    [texts, formatMessage],
  );

  const [tooltipTitle, setTooltipTitle] = useState(textsObj.copyTooltip);
  const [isCopiedBlock, setIsCopiedBlock] = useState(false);

  const handleCopy = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (copyValue && copy(copyValue)) {
        setTooltipTitle(textsObj.copiedTooltip);
        setIsCopiedBlock(true);
        setTimeout(() => {
          setIsCopiedBlock(false);
          setTooltipTitle(textsObj.copyTooltip);
        }, 2000);

        onCopy && onCopy();
      }
      onClick?.(event);
    },
    [copyValue, onClick, textsObj.copiedTooltip, textsObj.copyTooltip, onCopy],
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!isCopiedBlock) {
        setTooltipTitle(textsObj.copyTooltip);
      }

      onMouseEnter && onMouseEnter(event);
    },
    [isCopiedBlock, textsObj, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onMouseLeave && onMouseLeave(event);
    },
    [onMouseLeave],
  );

  return (
    <Tooltip placement={placement} title={tooltipTitle}>
      <S.CopyIcon
        data-testid="ds-copy-icon"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCopy}
        {...rest}
      >
        {icon || <Icon component={<CopyClipboardM />} size={24} />}
      </S.CopyIcon>
    </Tooltip>
  );
};

export default CopyIcon;
