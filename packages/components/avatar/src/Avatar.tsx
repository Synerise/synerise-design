import * as React from 'react';
import { AvatarProps } from 'antd/lib/avatar';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import AntdAvatar from './Avatar.styles';

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

export interface Props extends Omit<AvatarProps, 'size' | 'icon'> {
  hasStatus?: boolean;
  size?: number | 'small' | 'default' | 'large' | 'extraLarge' | undefined;
  iconComponent?: React.ReactNode;
  backgroundColor?: backgroundColors;
  backgroundColorHue?: backgroundColorHue;
  disabled?: boolean;
}

const Avatar: React.FC<Props> = ({
  backgroundColor,
  backgroundColorHue,
  disabled,
  hasStatus,
  iconComponent,
  ...antdProps
}) => {
  const [pressed, setPressed] = React.useState(false);

  return (
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
  );
};

export default Avatar;
