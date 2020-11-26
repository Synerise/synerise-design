import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon from '@synerise/ds-icon';
import { DuplicateM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { useIntl } from 'react-intl';
import * as S from './DescriptionRow.styles';
import { CopyProps } from './Copy.types';
import { RowTexts } from './DescriptionRow.types';

const Copy: React.FC<CopyProps> = ({ copyValue, texts }) => {
  const { formatMessage } = useIntl();
  const textsObj: RowTexts = React.useMemo(
    () =>
      texts || {
        copiedTooltip: formatMessage({ id: 'DS.DESCRIPTION.COPIED' }),
        copyTooltip: formatMessage({ id: 'DS.DESCRIPTION.COPY-VALUE' }),
      },
    [texts, formatMessage]
  );

  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);
  const [tooltipTitle, setTooltipTitle] = React.useState(textsObj.copyTooltip);

  const handleCopy = React.useCallback(() => {
    if (copyValue && copy(copyValue)) {
      setTooltipTitle(textsObj.copiedTooltip);
      setTooltipVisible(true);
    }
  }, [copyValue, setTooltipTitle, textsObj.copiedTooltip]);

  const handleMouseEnter = React.useCallback(
    e => {
      e.stopPropagation();
      setTooltipTitle(textsObj.copyTooltip);
      setTooltipVisible(true);
    },
    [setTooltipVisible]
  );

  const handleMouseLeave = React.useCallback(
    e => {
      e.stopPropagation();
      setTooltipVisible(false);
    },
    [setTooltipVisible]
  );

  return (
    <Tooltip title={tooltipTitle} visible={tooltipVisible}>
      <S.Copyable
        className="ds-description-copy"
        onClick={handleCopy}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon component={<DuplicateM />} />
      </S.Copyable>
    </Tooltip>
  );
};

export default Copy;
