import React from 'react';

import { DEFAULT_AVATARS, TOTAL_DEFAULT_AVATARS } from './defaultAvatars';

export { TOTAL_DEFAULT_AVATARS };

type DefaultAvatarIconProps = {
  index: number;
};

const DefaultAvatarIcon: React.FC<DefaultAvatarIconProps> = ({ index }) => {
  const total = TOTAL_DEFAULT_AVATARS as number;
  if (total === 0) {
    return null;
  }

  const safeIndex = ((index % total) + total) % total;
  const SvgComponent = DEFAULT_AVATARS[safeIndex];

  if (!SvgComponent) {
    return null;
  }

  return (
    <SvgComponent width="100%" height="100%" style={{ display: 'block' }} />
  );
};

export default DefaultAvatarIcon;
