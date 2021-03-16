import * as React from 'react';
import Icon from '@synerise/ds-icon';
import selectColorByLetter, { ColorObject } from '@synerise/ds-utils/dist/selectColorByLetter/selectColorByLetter';

import { Color, ColorHue } from './Avatar.types';

export function getUserText(firstName = '', lastName = '', src = '', text = ''): string | null {
  if (src) return null;
  if (text) return text;
  if (firstName || lastName) return `${firstName.substr(0, 1).toUpperCase()}${lastName.substr(0, 1).toUpperCase()}`;
  return null;
}

export function isIconComponent(component: React.ReactNode | undefined): boolean {
  return component ? (component as Function).name === Icon.name : false;
}

export function getObjectName(name = '', text = ''): string | null {
  if (text) return text.toUpperCase();
  if (name) return name.substr(0, 1).toUpperCase();
  return null;
}

export function addIconColor(iconComponent: React.ReactNode, color: string): React.ReactElement {
  let iconElement = iconComponent as React.ReactElement;
  if (isIconComponent(iconElement?.type) && !iconElement?.props?.color) {
    iconElement = React.cloneElement(iconElement, { color });
  }
  return iconElement;
}

export function getColorByText(text: string | null, backgroundColor?: 'auto' | Color): [Color, ColorHue] {
  const autoColor =
    ((typeof text === 'string' ? selectColorByLetter(text.slice(0, 1), true) : {}) as ColorObject)?.color || 'grey';
  const color = text && backgroundColor && backgroundColor !== 'auto' ? (backgroundColor as Color) : autoColor;
  const hue = text ? '500' : '100';
  return [color as Color, hue as ColorHue];
}
