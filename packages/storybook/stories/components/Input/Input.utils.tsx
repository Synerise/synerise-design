import { theme } from "@synerise/ds-core";
import Icon, { LaptopM } from "@synerise/ds-icon";
import { TagShape } from "@synerise/ds-tag";
import Tooltip from "@synerise/ds-tooltip";
import React from "react";
import * as S from './Input.styles';

export const addonType = {
    icon: 'icon',
    tag: 'tag',
    avatar: 'avatar',
    label: 'label',
    none: 'none',
  };
  
export const renderAddonComponent = (elementType?: string, labelText?: string) => {
    if (!elementType) {
        return null
    }
    switch (elementType) {
      case addonType.icon:
        return (
          <S.IconWrapper>
            <Icon color={theme.palette['grey-600']} component={<LaptopM />} />
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
            color={theme.palette['cyan-200']}
            textColor={theme.palette['cyan-600']}
          />
        );
      default:
        return null;
    }
  }