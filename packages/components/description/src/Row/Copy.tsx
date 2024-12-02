import React, { useState, useMemo, useCallback, MouseEvent } from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon, { CopyClipboardM } from '@synerise/ds-icon';

import copy from 'copy-to-clipboard';
import { useIntl } from 'react-intl';
import * as S from './DescriptionRow.styles';
import { CopyProps } from './Copy.types';
import { RowTexts } from './DescriptionRow.types';

const Copy = ({ copyValue, texts, className, onMouseEnter, onMouseLeave }: CopyProps) => {
  const { formatMessage } = useIntl();
  const textsObj: RowTexts = useMemo(
    () =>
      texts || {
        copiedTooltip: formatMessage({ id: 'DS.DESCRIPTION.COPIED' }),
        copyTooltip: formatMessage({ id: 'DS.DESCRIPTION.COPY-VALUE' }),
      },
    [texts, formatMessage]
  );

  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipTitle, setTooltipTitle] = useState(textsObj.copyTooltip);

  const handleCopy = useCallback(() => {
    if (copyValue && copy(copyValue)) {
      setTooltipTitle(textsObj.copiedTooltip);
      setTooltipVisible(true);
    }
  }, [copyValue, setTooltipTitle, textsObj.copiedTooltip]);

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setTooltipTitle(textsObj.copyTooltip);
      setTooltipVisible(true);
      onMouseEnter && onMouseEnter(event);
    },
    [setTooltipVisible, textsObj, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setTooltipVisible(false);
      onMouseLeave && onMouseLeave(event);
    },
    [setTooltipVisible, onMouseLeave]
  );

  return (
    <Tooltip title={tooltipTitle} visible={tooltipVisible}>
      <S.Copyable
        className={`ds-description-copy ${className}`}
        onClick={handleCopy}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon component={<CopyClipboardM />} />
      </S.Copyable>
    </Tooltip>
  );
};

export default Copy;
