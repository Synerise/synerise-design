import { type ReactElement, type ReactNode, cloneElement } from 'react';

import Icon from '@synerise/ds-icon';
import selectColorByLetter, {
  type ColorObject,
} from '@synerise/ds-utils/dist/selectColorByLetter/selectColorByLetter';

import {
  type AvatarProps,
  type Color,
  type ColorHue,
  type TooltipObject,
  type UserAvatar,
} from './Avatar.types';

function getFirstLetter(from: string | null): string {
  return (from || '').substr(0, 1).toUpperCase();
}

export function getUserText(
  user: UserAvatar,
  src: string | null = '',
  text: string | null = '',
): string | null {
  const { firstName = '', lastName = '', email = '', avatar = '' } = user;
  if (src || avatar) {
    return null;
  }
  if (text) {
    return text;
  }
  if (firstName || lastName) {
    return `${getFirstLetter(firstName)}${getFirstLetter(lastName)}`;
  }
  if (email) {
    return getFirstLetter(email);
  }
  return null;
}

export function isIconComponent(component: ReactNode | undefined): boolean {
  return component
    ? (component as unknown as Function).name === Icon.name
    : false;
}

export function getObjectName(
  name: string | null = '',
  text = '',
): string | null {
  if (text) {
    return text.toUpperCase();
  }
  if (name) {
    return name.substr(0, 1).toUpperCase();
  }
  return null;
}

export function addIconColor(
  iconComponent: ReactNode,
  color: string,
): ReactElement {
  let iconElement = iconComponent as ReactElement;
  if (iconElement && !iconElement?.props?.color) {
    iconElement = cloneElement(iconElement, { color });
  }
  return iconElement;
}

export function getColorByText(
  text: string | null,
  backgroundColor?: 'auto' | Color | string,
): [Color, ColorHue] {
  if (backgroundColor && backgroundColor.indexOf('-') !== -1) {
    return backgroundColor.split('-') as [Color, ColorHue];
  }
  const autoColor =
    (
      (typeof text === 'string'
        ? selectColorByLetter(text.slice(0, 1), true)
        : {}) as ColorObject
    )?.color || 'grey';
  const color =
    text && backgroundColor && backgroundColor !== 'auto'
      ? (backgroundColor as Color)
      : autoColor;
  const hue = text ? '500' : '100';
  return [color as Color, hue as ColorHue];
}

export function getDefaultAvatarIndex(
  userId: string | number,
  totalAvatars: number,
): number {
  const str = String(userId);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return ((hash % totalAvatars) + totalAvatars) % totalAvatars;
}

export function getTooltipProps(
  tooltip: AvatarProps['tooltip'],
): TooltipObject {
  const tooltipProps: TooltipObject =
    typeof tooltip === 'object'
      ? {
          ...tooltip,
          title: tooltip.title || tooltip.name,
          description: tooltip.description || tooltip.email,
        }
      : {};
  const tooltipType =
    (['title', 'description', 'status'] as const).reduce(
      (prev, next) => (tooltipProps[next] ? prev + 1 : prev),
      0,
    ) === 1
      ? 'default'
      : 'largeSimple';

  const finalTooltipProps: TooltipObject =
    tooltipType === 'default'
      ? {
          ...tooltipProps,
          title:
            tooltipProps.title ||
            tooltipProps.description ||
            tooltipProps.status,
          type: 'default',
        }
      : {
          ...tooltipProps,
          type: 'largeSimple',
        };

  return finalTooltipProps;

  return tooltipProps;
}
