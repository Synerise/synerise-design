import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import DSListItem, {
  ListWrapper as DSListWrapper,
  type StyledListItem,
} from '@synerise/ds-list-item';

type SelectorProps = {
  $size?: string;
  $open?: boolean;
  $error?: boolean;
  $disabled?: boolean;
  $readOnly?: boolean;
  $grey?: boolean;
  $multiple?: boolean;
  $clearable?: boolean;
  $withPrefixel?: boolean;
  $withSuffixel?: boolean;
  $selectorStyle?: import('styled-components').CSSObject;
};

const HEIGHT = { large: 48, default: 32, small: 24 } as const;

const addonStyles = css`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.palette['grey-050']};
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['grey-300']};
  color: ${(props) => props.theme.palette['grey-500']};
  font-size: 13px;
  line-height: 1.39;
`;

export const SelectContainer = styled.div<{ hasBottomMargin?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 0 0 ${(props) => (props.hasBottomMargin ? 16 : 0)}px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const PrefixWrapper = styled.div`
  border-radius: 3px 0 0 3px;
  margin-right: -2px;
  padding-right: 1px;
  ${addonStyles};
`;

export const SuffixWrapper = styled.div`
  border-radius: 0 3px 3px 0;
  margin-left: -1px;
  ${addonStyles};
`;

/** The trigger box (the `.ds-select` selector). */
export const Selector = styled.div<SelectorProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  ${(props) => {
    const h =
      HEIGHT[(props.$size as keyof typeof HEIGHT) ?? 'default'] ??
      HEIGHT.default;
    return props.$multiple
      ? css`
          min-height: ${h}px;
          height: auto;
          padding: 3px 30px 3px 8px;
          flex-wrap: wrap;
          gap: 4px;
        `
      : css`
          height: ${h}px;
          padding: 0 30px 0 12px;
        `;
  }}
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 3px;
  background-color: ${(props) =>
    props.$grey ? props.theme.palette['grey-050'] : props.theme.palette.white};
  color: ${(props) => props.theme.palette['grey-700']};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    props.$withPrefixel &&
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
  ${(props) =>
    props.$withSuffixel &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}

  ${(props) =>
    !props.$open &&
    !props.$error &&
    css`
      &:hover {
        border-color: ${props.theme.palette['grey-400']};
      }
    `}

  /* When clearable, the clear icon replaces the chevron while hovering the
     whole select (the icon hooks toggle visibility). */
  ${(props) =>
    props.$clearable &&
    css`
      &:hover .ds-select-arrow {
        display: none;
      }
      &:hover .ds-select-clear {
        display: flex;
      }
    `}

  ${(props) =>
    props.$open &&
    css`
      box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
      border-color: ${props.theme.palette['blue-600']};
      background-color: ${props.theme.palette['blue-050']};
    `}

  ${(props) =>
    props.$error &&
    css`
      border-color: ${props.theme.palette['red-600']};
      box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
      background: ${props.theme.palette['red-050']};
    `}

  ${(props) =>
    props.$disabled &&
    css`
      cursor: ${props.$readOnly ? 'default' : 'not-allowed'};
      color: ${props.$readOnly
        ? props.theme.palette['grey-600']
        : props.theme.palette['grey-400']};
      background-color: ${props.$readOnly
        ? props.theme.palette.white
        : props.theme.palette['grey-050']};
      &:hover {
        border-color: ${props.theme.palette['grey-300']};
      }
    `}

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.$selectorStyle && css(props.$selectorStyle)}
`;

export const SelectionItem = styled.span`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Placeholder = styled.span`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.palette['grey-500']};
`;

export const Arrow = styled.span<{ $open?: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  display: flex;
  align-items: center;
  transform: translateY(-50%)
    ${(props) => (props.$open ? 'rotate(180deg)' : '')};
  transition: transform 0.3s;
  color: ${(props) => props.theme.palette['grey-500']};
  pointer-events: none;
`;

export const ClearWrapper = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.palette['red-600']};
  }
`;

/* ── dropdown (mirrors ds-autocomplete's dropdown: ListWrapper + Scrollbar) ── */

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 120px;
`;

export const ScrollList = styled(DSListWrapper)`
  && {
    padding-right: 0;
  }
`;

export const Inner = styled.div`
  padding-right: 8px;
`;

export const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  color: ${(props) => props.theme.palette['grey-600']};
  font-weight: normal;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const OptionItem: StyledListItem = styled(DSListItem)`
  min-width: auto;
  font-weight: normal;

  &&:hover:not(.ds-list-item-disabled),
  &&.ds-select-item-option-active:not(.ds-list-item-disabled) {
    background-color: ${(props) => props.theme.palette['blue-050']};
  }
`;

/** In-selector search input (showSearch / multiple / tags). */
export const SearchInputEl = styled.input`
  flex: 1 1 30px;
  min-width: 30px;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 13px;
  color: ${(props) => props.theme.palette['grey-700']};
  cursor: inherit;
  &::placeholder {
    color: ${(props) => props.theme.palette['grey-500']};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

/** Wraps chips + the search input for multiple/tags mode. */
export const MultiValueArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  max-width: 100%;
  min-height: 24px;
  padding: 0 2px 0 8px;
  background: ${(props) => props.theme.palette['grey-200']};
  border: none;
  border-radius: 3px;
  font-size: 13px;
  line-height: 1;
  color: ${(props) => props.theme.palette['grey-600']};

  &:hover {
    background: ${(props) => props.theme.palette['grey-300']};
    color: ${(props) => props.theme.palette['grey-800']};
  }
  &:hover .ds-select-selection-item-remove {
    visibility: visible;
  }
`;

export const ChipLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ChipRemove = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  visibility: hidden;
  svg {
    fill: ${(props) => props.theme.palette['red-600']};
  }
`;
