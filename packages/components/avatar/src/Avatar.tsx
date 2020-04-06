import * as React from 'react';
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar';
import Tooltip from '@synerise/ds-tooltip';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import AntdAvatar from './Avatar.styles';

type color =
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

type colorHue = '900' | '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100' | '050';
type size = 'small' | 'medium' | 'large' | 'extraLarge' | undefined;
export interface AvatarProps extends Omit<AntAvatarProps, 'size' | 'icon'> {
  hasStatus?: boolean;
  size?: size;
  iconComponent?: React.ReactNode;
  backgroundColor?: color;
  backgroundColorHue?: colorHue;
  disabled?: boolean;
  placeholderColor?: color;
  placeholderColorHue?: colorHue;
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
  placeholderColor,
  placeholderColorHue,
  ...antdProps
}: AvatarProps) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Tooltip type="avatar" title={tooltip?.name} description={tooltip?.email} mouseLeaveDelay={0} mouseEnterDelay={0}>
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
        {...antdProps}
      >
        {iconComponent || antdProps.children}
      </AntdAvatar>
    </Tooltip>
  );
};

export default Avatar;
