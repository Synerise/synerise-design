import * as React from 'react';
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import Tooltip from '@synerise/ds-tooltip';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import AntdAvatar, { TooltipGroup } from './Avatar.styles';

type backgroundColors =
  | 'red'
  | 'green'
  | 'grey'
  | 'yellow'
  | 'blue'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';

type backgroundColorHue = '900' | '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100' | '050';

export interface AvatarProps extends Omit<AntAvatarProps, 'size' | 'icon'> {
  hasStatus?: boolean;
  size?: number | 'small' | 'medium' | 'large' | 'extraLarge' | undefined;
  iconComponent?: React.ReactNode;
  backgroundColor?: backgroundColors;
  backgroundColorHue?: backgroundColorHue;
  disabled?: boolean;
  tooltip?: {
    name: string;
    email: string;
  };
}

const Avatar: React.FC<AvatarProps> = ({
  backgroundColor,
  backgroundColorHue,
  disabled,
  hasStatus,
  iconComponent,
  tooltip,
  ...antdProps
}) => {
  const [pressed, setPressed] = React.useState(false);
  const tooltipGroup = tooltip && (
    <TooltipGroup>
      <p>{tooltip.name}</p>
      <p>{tooltip.email}</p>
    </TooltipGroup>
  );
  return (
    <Tooltip title={tooltipGroup}>
      <AntdAvatar
        onMouseDown={(): void => setPressed(true)}
        onMouseOut={(): void => setPressed(false)}
        onMouseUp={(): void => setPressed(false)}
        onBlur={(): void => setPressed(false)}
        pressed={pressed}
        hasStatus={hasStatus}
        backgroundColor={backgroundColor}
        backgroundColorHue={backgroundColorHue}
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdProps}
      >
        {iconComponent || antdProps.children}
      </AntdAvatar>
    </Tooltip>
  );
};

export default Avatar;
