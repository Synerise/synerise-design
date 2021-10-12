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
  const timeoutClickRef = React.useRef<null | number>(null);

  React.useEffect(() => {
    return (): void => {
      if (timeoutClickRef.current) {
        clearTimeout(timeoutClickRef.current);
      }
    };
  }, []);

  useOnClickOutside(iconRef, () => {
    if (hideHoverTooltip) {
      setHideHoverTooltip(false);
      if (timeoutClickRef.current) {
        clearTimeout(timeoutClickRef.current);
      }
    }
  });
  const handleIconClickTooltip = (): void => {
    if (!hideHoverTooltip) {
      setHideHoverTooltip(true);
      timeoutClickRef.current = setTimeout(() => {
        setHideHoverTooltip(false);
      }, 3000);
    }
  };
  return (
    <Tooltip title={tooltipTitleClick} trigger="click" hideAfterClick={3000}>
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
