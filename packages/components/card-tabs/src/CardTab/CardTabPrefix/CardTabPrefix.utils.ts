import {
  type DotPrefixProps,
  type HandlePrefixProps,
  type IconPrefixProps,
  type PrefixProps,
  type TagPrefixProps,
  prefixType,
} from '../CardTab.types';

export const isTagPrefix = (props: PrefixProps): props is TagPrefixProps => {
  return props.prefix === prefixType.TAG;
};

export const isDotPrefix = (props: PrefixProps): props is DotPrefixProps => {
  return props.prefix === prefixType.DOT;
};

export const isIconPrefix = (props: PrefixProps): props is IconPrefixProps => {
  return props.prefix === prefixType.ICON;
};

export const isHandlePrefix = (
  props: PrefixProps,
): props is HandlePrefixProps => {
  return props.prefix === prefixType.HANDLE;
};
