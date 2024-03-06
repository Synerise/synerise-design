import { ComponentType, ReactNode } from 'react';

export type RenderSingleIconProps = {
  icon: ReactNode;
  color: string;
  size: string | number;
  stroke?: boolean;
}

export type IIconSets = {
  icons: Record<string, ComponentType>;
  additionalIcons: Record<string, ComponentType>;
  lIcons: Record<string, ComponentType>;
  xlIcons: Record<string, ComponentType>;
}

export type SingleIconArgs = {
  icon: string;
  color: string;
  size: string | number;
  stroke?: boolean;
}