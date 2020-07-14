import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { BadgeProps as AntBadgeProps } from 'antd/lib/badge';
import AntdBadge from './Badge.styles';

export type Status = 'active' | 'inactive' | 'blocked' | 'processing' | undefined;

export interface BadgeProps extends Omit<AntBadgeProps, 'status'> {
  flag?: boolean;
  status?: Status;
  outlined?: boolean;
  backgroundColor?: string;
  textColor?: string;
  backgroundColorHue?: string;
  textColorHue?: string;
}

const Badge: React.FC<BadgeProps> = ({
  flag,
  outlined,
  backgroundColor,
  textColor,
  backgroundColorHue,
  textColorHue,
  ...antdProps
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdBadge
      flag={flag}
      outlined={outlined}
      backgroundColor={backgroundColor}
      textColor={textColor}
      backgroundColorHue={backgroundColorHue}
      textColorHue={textColorHue}
      {...antdProps}
    />
  );
};

export default Badge;
