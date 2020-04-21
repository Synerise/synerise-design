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
  /**
   * Aligns a badge with the avatar
   */
  hasStatus?: boolean;
  /**
   * The size of the avatar
   */
  size?: size;
  /**
   * Provides a custom component as a child. The prop icon has a greater priority if both are provided
   */
  iconComponent?: React.ReactNode;
  /**
   * Background color of the avatar
   */
  backgroundColor?: color;
  /**
   * Shade of the avatar background color
   */
  backgroundColorHue?: colorHue;
  /**
   * Defines if the avatar is disabled
   */
  disabled?: boolean;
  /**
   * Text on a tooltip
   */
  tooltip?: {
    name: string;
    email: string;
  };
}
const Avatar: React.FC<AvatarProps> = ({
  backgroundColor,
  backgroundColorHue = '400',
  disabled = false,
  hasStatus = false,
  iconComponent,
  tooltip,
  size = 'medium',
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
        size={size}
        {...antdProps}
      >
        {iconComponent || antdProps.children}
      </AntdAvatar>
    </Tooltip>
  );
};

export default Avatar;
