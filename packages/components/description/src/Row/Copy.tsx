import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon from '@synerise/ds-icon';
import { DuplicateM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { injectIntl, IntlShape } from 'react-intl';
import * as S from './DescriptionRow.styles';

interface CopyProps {
  copyValue: string;
  copyTooltip?: string;
  copiedTooltip?: string;
  intl: IntlShape;
}

const Copy: React.FC<CopyProps> = ({
  intl,
  copyValue,
  copiedTooltip = intl.formatMessage({ id: 'DS.DESCRIPTION.COPIED' }),
  copyTooltip = intl.formatMessage({ id: 'DS.DESCRIPTION.COPY-VALUE' }),
}) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [tooltipTitle, setTooltipTitle] = React.useState(copyTooltip);

  const handleCopy = React.useCallback(() => {
    if (copyValue && copy(copyValue)) {
      setTooltipTitle(copiedTooltip);
      setTooltipVisible(true);
    }
  }, [copyValue, setTooltipTitle, setTooltipVisible, copiedTooltip]);

  const handleMouseEnter = React.useCallback(() => {
    setTooltipVisible(true);
    setTooltipTitle(copyTooltip);
  }, [setTooltipTitle, setTooltipVisible, copyTooltip]);

  const handleMouseLeave = React.useCallback(() => {
    setTooltipVisible(false);
  }, [setTooltipVisible]);

  return (
    <Tooltip title={tooltipTitle} visible={tooltipVisible}>
      <S.Copyable
        className="ds-description-copy"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCopy}
      >
        <Icon component={<DuplicateM />} />
      </S.Copyable>
    </Tooltip>
  );
};

export default injectIntl(Copy);
