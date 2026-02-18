import { type ComponentType, type SVGProps, useMemo } from 'react';

import { type AllIconNames, iconManifest } from './DynamicIcon/iconManifest';

export type IconName = AllIconNames;

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const getIconComponent = (name: string): IconComponent | null => {
  const iconModule = iconManifest[name];
  if (!iconModule) {
    return null;
  }

  const component = iconModule[name];
  return component && typeof component === 'function' ? component : null;
};

export const useIconComponent = (name?: string): IconComponent | null => {
  return useMemo(() => {
    if (!name) {
      return null;
    }
    return getIconComponent(name);
  }, [name]);
};
