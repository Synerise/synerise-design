import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { borderStyle } from '../../../DatePicker.styles';

const selectedStyle = css`
  background: ${(props): string => props.theme.variable('@gray-color-lighter-8')};
  font-weight: 500;
  outline: ${borderStyle} !important;

  &:hover {
    background: ${(props): string => props.theme.variable('@gray-color-lighter-8')};
  }
`;

const disabledStyle = css`
  color: ${(props): string => props.theme.variable('@btn-disable-color')};

  &:hover {
    background: transparent;
    cursor: not-allowed;
  }
`;

export const List = styled.ul`
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
`;

export const Item = styled.li`
  list-style: none;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  width: 100%;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s;

  &:hover {
    background: ${(props): string => props.theme.variable('@item-hover-bg')};
  }

  ${props => props.selected && selectedStyle} ${props => props.disabled && disabledStyle};
`;
