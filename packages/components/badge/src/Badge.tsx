import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { BadgeProps } from './Badge.types';
import AntdBadge from './Badge.styles';

const Badge = ({
  flag,
  outlined,
  backgroundColor,
  textColor,
  backgroundColorHue,
  textColorHue,
  pulsing,
  customColor,
  ...antdProps
}: BadgeProps) => {
  return (
    <AntdBadge
      flag={flag}
      outlined={outlined}
      backgroundColor={backgroundColor}
      textColor={textColor}
      backgroundColorHue={backgroundColorHue}
      textColorHue={textColorHue}
      pulsing={pulsing}
      customColor={customColor}
      {...antdProps}
    />
  );
};

export default Badge;
