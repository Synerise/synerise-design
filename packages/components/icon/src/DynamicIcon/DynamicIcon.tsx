import React from 'react';

import Icon from '../Icon';
import type { IconProps } from '../Icon.types';
import { largeIconMapping } from '../icons/L/index';
import { xlargeIconMapping } from '../icons/XL/index';
import { additionalIconMapping } from '../icons/additional/index';
import { colorIconMapping } from '../icons/colorIcons/index';
import { mediumIconMapping } from '../icons/index';

const mergedMapping = {
  ...mediumIconMapping,
  ...largeIconMapping,
  ...xlargeIconMapping,
  ...colorIconMapping,
  ...additionalIconMapping,
};

type DynamicIconProps = Omit<IconProps, 'component'> & {
  name: keyof typeof mergedMapping;
};

export const DynamicIcon = ({ name, ...rest }: DynamicIconProps) => {
  const Component = mergedMapping[name as keyof typeof mergedMapping];
  return <Icon component={Component ? <Component /> : null} {...rest} />;
};
