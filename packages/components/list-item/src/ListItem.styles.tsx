import styled, { css } from 'styled-components';
import { ReactNode } from 'react';

type StyledListItemProps = {
  disabled?: boolean;
  selected?: boolean;
  prefixel?: ReactNode;
  suffixel?: boolean;
  description?: ReactNode;
  ordered?: boolean;
  active?: boolean;
  indentLevel?: number;
  visible?: boolean;
  highlight?: boolean;
  danger?: boolean;
  noHover?: boolean;
  switch?: boolean;
  isSelected?: boolean;
  selectable?: boolean;
  size?: 'default' | 'large';
};

const baseStyles = css<StyledListItemProps>`
  display: flex;
  align-items: center;
  min-width: 200px;
  margin: 0;
  padding-left: ${props => (props.prefixel ? '8px' : '12px')};
  padding-right: 12px;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  user-select: none;
  border-radius: 3px;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
  min-height: ${props => (props.size === 'large' ? '50px' : '32px')};
  background: none;
  border: none;
  color: ${props => props.theme.palette['grey-700']};
  cursor: pointer;
  opacity: 1;
`;

const disabledStyle = css`
  cursor: not-allowed;
  opacity: 0.4;
`;

const selectedStyle = css<StyledListItemProps>`
  background: ${props => props.theme.palette['blue-050']};
  color: ${props => props.theme.palette['blue-600']};
  border: 1px solid ${props => props.theme.palette['blue-600']};
`;

const hoverStyle = css<StyledListItemProps>`
  &:hover {
    background: ${props => props.theme.palette['grey-050']};
    color: ${props => (props.noHover ? props.theme.palette['grey-700'] : props.theme.palette['blue-600'])};
  }
`;

const focusStyle = css<StyledListItemProps>`
  &:focus,
  &.selected {
    box-shadow: ${props => (props.switch ? 'none' : `inset 0 0 0 2px ${props.theme.palette['blue-600']}`)};
    outline: none;
  }
`;

const nonSelectableStyle = css`
  pointer-events: none;
  cursor: default;
`;

const highlightStyle = css`
  font-weight: 400;
  & > .search-highlight {
    font-weight: 600;
  }
`;

const orderedStyle = css`
  &::before {
    content: none;
  }
`;

const dangerStyle = css<StyledListItemProps>`
  &:hover {
    color: ${props => props.theme.palette['red-600']};
    background: ${props => props.theme.palette['red-050']};
    border-color: ${props => props.theme.palette['red-600']};
  }
`;

const StyledListItem = styled.div<StyledListItemProps>`
  ${baseStyles}
  ${props => props.disabled && disabledStyle}
  ${props => props.selected && !props.switch && selectedStyle}
  ${hoverStyle}
  ${focusStyle}
  ${props => !props.selectable && !props.noHover && nonSelectableStyle}
  ${props => props.highlight && highlightStyle}
  ${props => !props.ordered && orderedStyle}
  ${props => props.danger && dangerStyle}
`;

export const StyledIconWrapper = styled.div`
  margin-right: 12px;
`;

export default StyledListItem;
