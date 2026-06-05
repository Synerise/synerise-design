import styled, { css } from 'styled-components';

import { type InlineAlertType } from './InlineAlert.types';

const COLOR_TOKENS: Record<InlineAlertType, string> = {
  success: 'var(--ds-inline-alert-icon-success)',
  warning: 'var(--ds-inline-alert-icon-warning)',
  alert: 'var(--ds-inline-alert-icon-error)',
  info: 'var(--ds-inline-alert-icon-informative)',
};

// No `-hover` module/semantic token exists for these (they resolve to the
// `-700` primitive shades), so the hover state keeps the theme.palette lookup.
const COLORS_HOVER: Record<InlineAlertType, string> = {
  success: 'green-700',
  warning: 'yellow-700',
  alert: 'red-700',
  info: 'grey-700',
};

export const Message = styled.span`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: inherit;
  margin-left: 4px;
`;

export const InlineAlertWrapper = styled.span<{
  type: InlineAlertType;
  hoverButton?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  &:hover {
    cursor: ${(props) => (props.hoverButton ? 'pointer' : 'auto')};
    color: ${(props) =>
      props.hoverButton
        ? props.theme.palette[COLORS_HOVER[props.type]]
        : COLOR_TOKENS[props.type]};
  }
  &:active {
    color: ${(props) => COLOR_TOKENS[props.type]};
  }
  color: ${(props) => COLOR_TOKENS[props.type]};

  ${(props) =>
    !!props.disabled &&
    css`
      pointer-events: none;
      opacity: var(--ds-opacity-disabled);
    `};
  ${Message} {
    color: var(--ds-inline-alert-text-default);
  }
`;
export const EmphasisWrapper = styled.span`
  display: flex;
  padding-bottom: 1px;
  font-size: 13px;
  line-height: 1.39;
  padding-left: 3px;
  font-weight: 500;
  color: inherit;
`;
export const LinkWrapper = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 400;
  margin-left: 3px;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`;
