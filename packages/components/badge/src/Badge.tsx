import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { BadgeProps } from 'Badge.types';
import AntdBadge from './Badge.styles';

const Badge: React.FC<BadgeProps> = ({
  flag,
  outlined,
  backgroundColor,
  textColor,
  backgroundColorHue,
  textColorHue,
  pulsing,
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
      pulsing={pulsing}
      {...antdProps}
    />
  );
};

export default Badge;
