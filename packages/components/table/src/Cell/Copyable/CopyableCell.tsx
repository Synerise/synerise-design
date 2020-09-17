import * as React from 'react';
import { CopyClipboardM } from '@synerise/ds-icon/dist/icons';
import * as copy from 'copy-to-clipboard';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Copyable.styles';
import { Props } from './Copyable.types';

const CopyableCell: React.FC<Props> = ({ value, confirmMessage, tooltipTimeout = 2000 }: Props) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTooltipVisible(false);
    }, tooltipTimeout);
    return (): void => clearTimeout(timer);
  }, [tooltipVisible, setTooltipVisible, tooltipTimeout]);

  const handleCopy = React.useCallback(() => {
    if (copy(value)) setTooltipVisible(true);
  }, [value]);

  return (
    <S.Copyable>
      <span>{value}</span>
      <Tooltip visible={tooltipVisible} title={confirmMessage} placement="left">
        <Icon onClick={handleCopy} component={<CopyClipboardM />} />
      </Tooltip>
    </S.Copyable>
  );
};

export default CopyableCell;
