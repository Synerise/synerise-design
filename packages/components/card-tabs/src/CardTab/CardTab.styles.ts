import styled from 'styled-components';

import { InPlaceEditableInputContainer } from '@synerise/ds-inline-edit/dist/InlineEdit.styles';
import { macro } from '@synerise/ds-typography';

import {
  customColorOr,
  getColor,
  getLighterColor,
  orderedBaseOr,
  orderedHoverOr,
} from '../utils';

export const CardTabSuffix = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 24px;
  display: none;
  :has([data-popover-trigger][data-state='open']) {
    display: flex;
  }
`;

export const CardTabName = styled.span`
  max-width: 100%;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const CardSuffixWrapper = styled.span`
  display: none;
`;

export const CardTabLabel = styled.span`
  ${macro.h300};
  color: var(--ds-card-tabs-variant-grey-text-default);
  line-height: 20px;
  position: relative;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${InPlaceEditableInputContainer} {
    input {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: var(--ds-card-tabs-variant-grey-text-hover);
      background-image: linear-gradient(
        to right,
        var(--ds-color-text-brand-default) 0%,
        var(--ds-color-text-brand-default) 33%,
        rgba(255, 255, 255, 0) 34%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

export const CardTabTag = styled.div`
  ${macro.h200}
  color: var(--ds-card-tabs-variant-grey-tag-text-default);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 3px;
`;
export const CardDotPrefix = styled.div`
  ${macro.h200}
  color: var(--ds-card-tabs-variant-grey-text-active);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
export const CardDot = styled.div`
  ${macro.h200}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

export const CardTabPrefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;
export const CardDragPrefix = styled.div<{ persistent: boolean }>`
  display: ${(props) => (props.persistent ? 'block' : 'none')};
`;
export const CardIconPrefix = styled.div`
  display: flex;
`;

export const CardTabContainer = styled.div<{
  active: boolean;
  invalid: boolean;
  greyBackground: boolean;
  color: string;
  // Slot in the `ordered` token queue for auto-assigned tabs; when set, the categorical
  // colour comes from that slot's token instead of the `color`-derived custom token.
  orderIndex?: number;
  disabled: boolean;
  edited: boolean;
  isDraggable?: boolean;
  itemData?: unknown;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  width: 168px;
  @media (max-width: 588px) {
    max-width: 145px;
  }
  height: 48px;
  user-select: none;
  background-color: ${({
    theme,
    active,
    invalid,
    color,
    orderIndex,
    greyBackground,
  }) => {
    if (invalid && active) {
      return 'var(--ds-card-tabs-variant-grey-bg-validateactive)';
    }
    if (active) {
      return orderedBaseOr(
        customColorOr(color, theme.palette[`${color}`]),
        orderIndex,
      );
    }
    if (greyBackground) {
      return 'var(--ds-card-tabs-variant-white-bg-default)';
    }
    return 'var(--ds-card-tabs-variant-grey-bg-default)';
  }};
  box-shadow: ${({ greyBackground }) =>
    greyBackground ? 'var(--ds-card-tabs-variant-white-shadow)' : '0'};
  border-radius: 3px;
  border-width: ${({ greyBackground }) => (greyBackground ? '0' : '1px')};
  border-color: ${({ theme, active, invalid, color, orderIndex }) => {
    if (invalid) {
      return 'var(--ds-card-tabs-variant-grey-border-validate)';
    }
    return getColor(
      active,
      orderedBaseOr(
        customColorOr(color, theme.palette[`${color}`]),
        orderIndex,
      ),
      'var(--ds-card-tabs-variant-grey-border-default)',
    );
  }};
  border-style: solid;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  ${CardTabTag} {
    background-color: ${({ theme, active, color, orderIndex }) =>
      getColor(
        active,
        'var(--ds-card-tabs-variant-grey-tag-bg-active)',
        orderedBaseOr(
          customColorOr(color, theme.palette[`${color}`]),
          orderIndex,
        ),
      )};
    color: ${({ theme, active, color, orderIndex }) =>
      getColor(
        active,
        orderedBaseOr(
          customColorOr(color, theme.palette[`${color}`]),
          orderIndex,
        ),
        'var(--ds-card-tabs-variant-grey-tag-text-default)',
      )};
  }
  ${CardDot} {
    background-color: ${({ theme, active, color, invalid, orderIndex }) => {
      if (active && invalid) {
        return orderedBaseOr(
          customColorOr(color, theme.palette[`${color}`]),
          orderIndex,
        );
      }
      return getColor(
        active,
        'transparent',
        orderedBaseOr(
          customColorOr(color, theme.palette[`${color}`]),
          orderIndex,
        ),
      );
    }};
  }
  ${CardDotPrefix} {
    height: ${({ active, edited }) => (active && !edited ? '12px' : '24px')};
    width: ${({ active, edited }) => (active && !edited ? '12px' : '24px')};
    border-width: ${({ active, edited }) =>
      active && !edited ? '2px' : '0px'};
    border-color: ${({ active, edited }) =>
      active && !edited ? 'var(--ds-card-tabs-variant-grey-dot-ring)' : 'none'};
    border-style: solid;
  }

  ${CardSuffixWrapper} {
    svg {
      color: ${({ active }) =>
        active
          ? 'var(--ds-card-tabs-variant-grey-icon-active)'
          : 'var(--ds-card-tabs-variant-grey-icon-default)'};
      fill: ${({ active }) =>
        active
          ? 'var(--ds-card-tabs-variant-grey-icon-active)'
          : 'var(--ds-card-tabs-variant-grey-icon-default)'} !important;
    }
  }

  ${CardTabSuffix} {
    svg {
      color: ${({ active }) =>
        active
          ? 'var(--ds-card-tabs-variant-grey-icon-active)'
          : 'var(--ds-card-tabs-variant-grey-icon-default)'} !important;
      fill: ${({ active }) =>
        active
          ? 'var(--ds-card-tabs-variant-grey-icon-active)'
          : 'var(--ds-card-tabs-variant-grey-icon-default)'} !important;
    }
    .remove {
      svg {
        color: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-remove-icon)'} !important;
        fill: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-remove-icon)'} !important;
      }
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${({ greyBackground }) =>
      greyBackground ? 'var(--ds-card-tabs-variant-white-shadow)' : ''};
    background-color: ${({
      theme,
      active,
      invalid,
      color,
      orderIndex,
      greyBackground,
    }) => {
      if (invalid && active) {
        /* ⚑ Shift: invalid+active hover was getLighterColor('red-600') = red-500 (#ff5a4d, lighter);
           the module token resolves to #cf1413 (darker). Adopted per TOKEN_AUDIT (bg.error.hover). */
        return 'var(--ds-card-tabs-variant-grey-bg-validateactivehover)';
      }
      if (active) {
        return orderedHoverOr(
          customColorOr(
            color,
            theme.palette[`${getLighterColor(color)}`],
            -100,
          ),
          orderIndex,
        );
      }
      if (greyBackground && !active) {
        return 'var(--ds-card-tabs-variant-white-bg-hover)';
      }
      return 'var(--ds-card-tabs-variant-grey-bg-hover)';
    }};
    ${CardTabSuffix} {
      display: ${({ edited }) => (edited ? 'none' : 'flex')};
    }
    ${CardSuffixWrapper} {
      display: ${({ edited }) => (edited ? 'none' : 'flex')};
    }
    ${CardTabLabel} {
      color: ${({ active }) =>
        active
          ? 'var(--ds-card-tabs-variant-grey-text-active)'
          : 'var(--ds-card-tabs-variant-grey-text-hover)'};
    }
    ${CardTabTag} {
      background-color: ${({ theme, color, active, orderIndex }) => {
        if (active) {
          return 'var(--ds-card-tabs-variant-grey-tag-bg-active)';
        }
        return orderedBaseOr(
          customColorOr(color, theme.palette[`${color}`]),
          orderIndex,
        );
      }};
      color: ${({ theme, active, color, orderIndex }) => {
        if (active) {
          return orderedBaseOr(
            customColorOr(color, theme.palette[`${color}`]),
            orderIndex,
          );
        }
        return 'var(--ds-card-tabs-variant-grey-tag-text-default)';
      }};
      display: ${(props) => (props.isDraggable ? 'none' : 'flex')};
    }
    ${CardTabPrefix} {
      svg {
        color: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'};
        fill: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'};
      }
    }
    ${CardDragPrefix} {
      display: ${({ edited }) => (edited ? 'none' : 'flex')};
      svg {
        color: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'};
        fill: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'} !important;
      }
    }

    ${CardDotPrefix} {
      display: ${(props) => (props.isDraggable ? 'none' : 'flex')};
    }
    ${CardIconPrefix} {
      display: ${(props) => (props.isDraggable ? 'none' : 'flex')};
      svg {
        color: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'};
        fill: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'};
      }
    }
    .ds-card-tabs__suffix-icon {
      svg {
        color: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'};
        fill: ${({ active }) =>
          active
            ? 'var(--ds-card-tabs-variant-grey-icon-active)'
            : 'var(--ds-card-tabs-variant-grey-icon-default)'} !important;
      }
    }
  }

  &:active {
    background-color: ${({
      theme,
      active,
      invalid,
      color,
      orderIndex,
      greyBackground,
    }) => {
      if (invalid && active) {
        /* ⚑ Shift: invalid+active pressed was getLighterColor('red-600') = red-500 (#ff5a4d, lighter);
           the module token resolves to #cf1413 (darker). Adopted per TOKEN_AUDIT (bg.error.pressed). */
        return 'var(--ds-card-tabs-variant-grey-bg-validateactivehover)';
      }
      if (active) {
        return orderedHoverOr(
          customColorOr(
            color,
            theme.palette[`${getLighterColor(color)}`],
            -100,
          ),
          orderIndex,
        );
      }
      if (greyBackground && !active) {
        return 'var(--ds-card-tabs-variant-white-bg-default)';
      }
      return 'var(--ds-color-background-base-muted)';
    }};
  }

  ${InPlaceEditableInputContainer} {
    input {
      color: ${({ active }) =>
        active
          ? 'var(--ds-card-tabs-variant-grey-text-active)'
          : 'var(--ds-card-tabs-variant-grey-text-hover)'};
      padding: 0 !important;
      background-image: linear-gradient(
        to right,
        ${({ active }) =>
            active
              ? 'var(--ds-card-tabs-variant-grey-text-active)'
              : 'var(--ds-card-tabs-variant-grey-text-hover)'}
          0%,
        ${({ active }) =>
            active
              ? 'var(--ds-card-tabs-variant-grey-text-active)'
              : 'var(--ds-card-tabs-variant-grey-text-hover)'}
          33%,
        rgba(255, 255, 255, 0) 34%,
        rgba(255, 255, 255, 0) 100%
      ) !important;
    }
  }

  ${CardTabLabel} {
    color: ${({ active }) =>
      active
        ? 'var(--ds-card-tabs-variant-grey-text-active)'
        : 'var(--ds-card-tabs-variant-grey-text-default)'};
    opacity: ${({ disabled }) =>
      disabled ? 'var(--ds-card-tabs-variant-grey-disabled-opacity)' : '1'};
  }

  .ds-card-tabs__suffix-icon {
    svg {
      color: ${({ active }) =>
        getColor(
          active,
          'var(--ds-card-tabs-variant-grey-icon-active)',
          'var(--ds-card-tabs-variant-grey-icon-default)',
        )};
      fill: ${({ active }) =>
        getColor(
          active,
          'var(--ds-card-tabs-variant-grey-icon-active)',
          'var(--ds-card-tabs-variant-grey-icon-default)',
        )};
    }
    opacity: ${({ disabled }) =>
      disabled ? 'var(--ds-card-tabs-variant-grey-disabled-opacity)' : '1'};
  }

  ${CardTabPrefix} {
    opacity: ${({ disabled }) =>
      disabled ? 'var(--ds-card-tabs-variant-grey-disabled-opacity)' : '1'};
    .ds-card-tabs__handle-icon {
      svg {
        color: ${({ active }) =>
          getColor(
            active,
            'var(--ds-card-tabs-variant-grey-icon-active)',
            'var(--ds-card-tabs-variant-grey-handler-default)',
          )};
        fill: ${({ active }) =>
          getColor(
            active,
            'var(--ds-card-tabs-variant-grey-icon-active)',
            'var(--ds-card-tabs-variant-grey-handler-default)',
          )};
      }
    }
    svg {
      color: ${({ active }) =>
        getColor(
          active,
          'var(--ds-card-tabs-variant-grey-icon-active)',
          'var(--ds-card-tabs-variant-grey-icon-default)',
        )};
      fill: ${({ active }) =>
        getColor(
          active,
          'var(--ds-card-tabs-variant-grey-icon-active)',
          'var(--ds-card-tabs-variant-grey-icon-default)',
        )};
    }

    ${CardTabSuffix} {
      opacity: ${({ disabled }) =>
        disabled ? 'var(--ds-card-tabs-variant-grey-disabled-opacity)' : '1'};
    }
  }
`;
