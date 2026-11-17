import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

import Icon from '@synerise/ds-icon';
import {
  type ColorObject,
  resolveCustomColor,
  selectColorByLetter,
} from '@synerise/ds-utils';

import type { AvatarProps, TooltipObject, UserAvatar } from './Avatar.types';

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
  return isValidElement(component) && component.type === Icon;
}

export function isSmallIconVariant(iconElement: ReactElement): boolean {
  const comp = iconElement.props.component;
  if (!isValidElement(comp) || typeof comp.type !== 'function') {
    return false;
  }
  const svgFn = comp.type as (props: Record<string, unknown>) => ReactElement;
  const rendered = svgFn(comp.props as Record<string, unknown>);
  const testId = (rendered?.props as Record<string, unknown>)?.['data-testid'];
  return typeof testId === 'string' && testId.endsWith('-s');
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
  color?: string,
): ReactElement {
  let iconElement = iconComponent as ReactElement;
  if (color && iconElement && !iconElement?.props?.color) {
    iconElement = cloneElement(iconElement, { color });
  }
  return iconElement;
}

/** A text avatar's background: the custom colour its first letter maps to, at shade 500. */
export function getTextBackground(text: string): string {
  const { color } = selectColorByLetter(
    text.trim().slice(0, 1),
    true,
  ) as ColorObject;
  return resolveCustomColor(`${color || 'grey'}-500`, 'transparent');
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
}
