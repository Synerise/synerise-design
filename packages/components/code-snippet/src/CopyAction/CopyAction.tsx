import React from 'react';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { useOnClickOutside } from '@synerise/ds-utils';

import * as S from './CopyAction.styles';
import { type CopyActionProps } from './CopyAction.types';

const CopyAction: React.FC<CopyActionProps> = ({
  tooltipTitleHover,
  tooltipTitleClick,
  className,
  onClick,
  icon,
  iconSize,
  customTriggerComponent,
  timeToHideTooltip = 3000,
}) => {
  const [hideHoverTooltip, setHideHoverTooltip] = React.useState(false);
  const iconRef = React.useRef<HTMLDivElement>(null);
  const timeoutClickRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(() => {
    return (): void => {
      timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
    };
  }, []);

  useOnClickOutside(iconRef, () => {
    if (hideHoverTooltip) {
      setHideHoverTooltip(false);
      timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
    }
  });
  const handleIconClickTooltip = (): void => {
    timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
    setHideHoverTooltip(true);
    timeoutClickRef.current = setTimeout(() => {
      setHideHoverTooltip(false);
    }, 3000);
  };
  return (
    <Tooltip
      title={tooltipTitleClick}
      trigger="click"
      timeToHideAfterClick={timeToHideTooltip}
    >
      <Tooltip
        title={tooltipTitleHover}
        overlayStyle={hideHoverTooltip ? { display: 'none' } : undefined}
      >
        <S.IconWrapper
          customTriggerComponent={!!customTriggerComponent}
          ref={iconRef}
          className={className}
          onClick={(e): void => {
            !!e && e.stopPropagation();
            handleIconClickTooltip();
            onClick && onClick();
          }}
        >
          {customTriggerComponent || (
            <Icon component={icon} size={iconSize || 24} />
          )}
        </S.IconWrapper>
      </Tooltip>
    </Tooltip>
  );
};
export default CopyAction;
