import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon from '@synerise/ds-icon';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './CopyAction.styles';
import { CopyActionProps } from './CopyAction.types';

const CopyAction: React.FC<CopyActionProps> = ({
  tooltipTitleHover,
  tooltipTitleClick,
  className,
  onClick,
  icon,
  iconSize,
}) => {
  const [hideHoverTooltip, setHideHoverTooltip] = React.useState(false);
  const iconRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(iconRef, () => {
    if (hideHoverTooltip) {
      setHideHoverTooltip(false);
    }
  });
  const handleIconClickTooltip = (): void => {
    if (!hideHoverTooltip) {
      setHideHoverTooltip(true);
    }
  };
  return (
    <Tooltip title={tooltipTitleClick} trigger="click" visible={hideHoverTooltip}>
      <Tooltip title={tooltipTitleHover} overlayStyle={hideHoverTooltip ? { display: 'none' } : undefined}>
        <S.IconWrapper
          ref={iconRef}
          className={className}
          onClick={(e): void => {
            !!e && e.stopPropagation();
            handleIconClickTooltip();
            onClick && onClick();
          }}
        >
          <Icon component={icon} size={iconSize || 24} />
        </S.IconWrapper>
      </Tooltip>
    </Tooltip>
  );
};
export default CopyAction;
