import React, { type ReactNode } from 'react';

import Icon from '../Icon';
import type { IconProps } from '../Icon.types';
import { type IconName, useIconComponent } from '../useIconComponent';

export type DynamicIconProps = Omit<IconProps, 'component' | 'iconName'> & {
  name: IconName;
  fallback?: ReactNode;
};

/**
 * @deprecated Use `<Icon iconName="IconName" />` instead of `<DynamicIcon name="IconName" />`.
 * The Icon component now supports dynamic icon loading via the `iconName` prop.
 * @example
 * // Before (deprecated):
 * <DynamicIcon name="InfoM" />
 *
 * // After (recommended):
 * <Icon iconName="InfoM" />
 */
export const DynamicIcon = ({
  name,
  fallback = null,
  ...props
}: DynamicIconProps) => {
  const IconComponent = useIconComponent(name);

  if (!IconComponent) {
    return fallback;
  }

  return <Icon {...props} iconName={name} />;
};

export default DynamicIcon;
export type { IconName as DynamicIconName };
