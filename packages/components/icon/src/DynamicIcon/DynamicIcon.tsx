import React, { type ReactNode, useMemo } from 'react';

import Icon from '../Icon';
import type { IconProps } from '../Icon.types';
import { iconManifest } from './iconManifest';

export type DynamicIconProps = Omit<IconProps, 'component'> & {
  name: DynamicIconName;
  fallback?: ReactNode;
};
export type DynamicIconName = keyof typeof iconManifest;

export const DynamicIcon = ({
  name,
  fallback = null,
  ...props
}: DynamicIconProps & {}) => {
  const IconComponent = useMemo(() => {
    const iconModule = iconManifest[name];
    if (!iconModule) {
      return null;
    }

    const component = iconModule[name];
    return component && typeof component === 'function' ? component : null;
  }, [name]);

  if (!IconComponent) {
    return fallback;
  }

  return <Icon {...props} component={<IconComponent />} />;
};

export default DynamicIcon;
