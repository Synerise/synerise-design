import { type ComponentType, type SVGProps } from 'react';

import * as large from '../icons/L';
import * as medium from '../icons/M';
import * as xlarge from '../icons/XL';
import * as additional from '../icons/additional';
import * as color from '../icons/colorIcons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type IconModule = Record<string, IconComponent>;

// Extract icon names from all modules as literal types
type MediumIconNames = keyof typeof medium;
type LargeIconNames = keyof typeof large;
type XLargeIconNames = keyof typeof xlarge;
type AdditionalIconNames = keyof typeof additional;
type ColorIconNames = keyof typeof color;

// Combine all icon names into a single union type
export type AllIconNames =
  | MediumIconNames
  | LargeIconNames
  | XLargeIconNames
  | AdditionalIconNames
  | ColorIconNames;

type IconEntry = {
  module: IconModule;
};

const iconSources: IconEntry[] = [
  { module: medium as IconModule },
  { module: large as IconModule },
  { module: xlarge as IconModule },
  { module: additional as IconModule },
  { module: color as IconModule },
];

export const iconManifest: Record<string, IconModule> = {};

iconSources.forEach(({ module }) => {
  Object.keys(module)
    .filter((key) => !key.startsWith('__') && key !== 'default')
    .forEach((iconName) => {
      iconManifest[iconName] = module;
    });
});
