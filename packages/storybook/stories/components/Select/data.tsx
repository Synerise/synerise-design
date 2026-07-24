import React, { FocusEvent, useState } from 'react';

import Icon, { LaptopM } from '@synerise/ds-icon';
import Select from '@synerise/ds-select';
import type { SelectProps } from '@synerise/ds-select';
import { TagShape } from '@synerise/ds-tag';
import { customColors } from '@synerise/ds-tokens/names';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../Input/Input.styles';

const { Option } = Select;

export const childrens = [
  'Option A',
  'Option B',
  'Option C',
  'Option D',
  'Option E',
  'Option F',
  'Option G',
  'Option H',
  'Option I',
];

export const values = [
  'Option A',
  'Option B',
  'Option C',
  'Very long option name with overflow',
];

export const defaultRender = (args: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    args.onBlur && args.onBlur(event);
    setIsFocused(false);
  };
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    args.onFocus && args.onFocus(event);
    setIsFocused(true);
  };
  return (
    <div data-popup-container>
      <Select
        {...args}
        errorText={!isFocused && args.errorText}
        error={!isFocused && args.error}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};

export const addonType = {
  icon: 'icon',
  tag: 'tag',
  avatar: 'avatar',
  label: 'label',
  none: 'none',
};

export function renderAddonComponent(
  suffixElementType: string,
  labelText: string,
) {
  switch (suffixElementType) {
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
        <S.AvatarWithMargin
          size="small"
          backgroundColor="green"
          backgroundColorHue="400"
          shape="square"
        >
          AK
        </S.AvatarWithMargin>
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
}
