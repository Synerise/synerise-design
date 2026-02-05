import copy from 'copy-to-clipboard';
import React, { type MouseEvent, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import Icon, { CopyClipboardM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type CopyProps } from './Copy.types';
import * as S from './DescriptionRow.styles';
import { type RowTexts } from './DescriptionRow.types';

/**
 *  @deprecated it will receive no further updates and will be removed from future DS versions
 */
const Copy = ({
  copyValue,
  texts,
  className,
  onMouseEnter,
  onMouseLeave,
}: CopyProps) => {
  const { formatMessage } = useIntl();
  const textsObj: RowTexts = useMemo(
    () =>
      texts || {
        copiedTooltip: formatMessage({ id: 'DS.DESCRIPTION.COPIED' }),
        copyTooltip: formatMessage({ id: 'DS.DESCRIPTION.COPY-VALUE' }),
      },
    [texts, formatMessage],
  );

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [tooltipTitle, setTooltipTitle] = useState(textsObj.copyTooltip);

  const handleCopy = useCallback(() => {
    if (copyValue && copy(copyValue)) {
      setTooltipTitle(textsObj.copiedTooltip);
      setTooltipOpen(true);
    }
  }, [copyValue, setTooltipTitle, textsObj.copiedTooltip]);

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setTooltipTitle(textsObj.copyTooltip);
      setTooltipOpen(true);
      onMouseEnter && onMouseEnter(event);
    },
    [setTooltipOpen, textsObj, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setTooltipOpen(false);
      onMouseLeave && onMouseLeave(event);
    },
    [setTooltipOpen, onMouseLeave],
  );

  return (
    <Tooltip title={tooltipTitle} open={tooltipOpen}>
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
