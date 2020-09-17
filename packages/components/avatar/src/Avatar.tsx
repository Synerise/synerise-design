import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';
import AntdAvatar from './Avatar.styles';
import { AvatarProps } from './Avatar.types';

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
