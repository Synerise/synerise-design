import React from 'react';

import Icon, { LaptopM } from '@synerise/ds-icon';
import { TagShape } from '@synerise/ds-tag';
import { customColors } from '@synerise/ds-tokens/names';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Input.styles';

export const addonType = {
  icon: 'icon',
  tag: 'tag',
  avatar: 'avatar',
  label: 'label',
  none: 'none',
};

export const renderAddonComponent = (
  elementType?: string,
  labelText?: string,
) => {
  if (!elementType) {
    return null;
  }
  switch (elementType) {
    case addonType.icon:
      return (
        <S.IconWrapper>
          <Icon
            color="var(--ds-color-icon-base-default)"
            component={<LaptopM />}
          />
        </S.IconWrapper>
      );
    case addonType.label:
      return (
        <Tooltip title={labelText}>
          <S.Label>{labelText}</S.Label>
        </Tooltip>
      );
    case addonType.avatar:
      return (
        <S.AvatarWithMargin size="small" text="AK" backgroundColor="green" />
      );
    case addonType.tag:
      return (
        <S.TagAddon
          name="A"
          shape={TagShape.SINGLE_CHARACTER_SQUARE}
          color={customColors.cyan['200']}
          textColor={customColors.cyan['600']}
        />
      );
    default:
      return null;
  }
};
