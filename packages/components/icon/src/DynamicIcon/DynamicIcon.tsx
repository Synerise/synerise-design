import React, { type ReactNode } from 'react';

import Icon from '../Icon';
import type { IconProps } from '../Icon.types';
import { type IconName, useIconComponentState } from '../useIconComponent';

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
  const { status } = useIconComponentState(name);

  // `fallback` means "this icon does not exist", as it always has. While the set is still loading we
  // render the sized, empty Icon box instead — same as `<Icon iconName>` — so a valid name never
  // flashes the fallback.
  if (status === 'missing') {
    return fallback;
  }

  return <Icon {...props} iconName={name} />;
};

export default DynamicIcon;
export type { IconName as DynamicIconName };
