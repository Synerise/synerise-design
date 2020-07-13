import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const RowLabel = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-600']};
  font-weight: normal;
  ${IconContainer} {
    margin-right: 4px;
    svg {
      color: ${(props): string => props.theme.palette['grey-600']};
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;

export const RowValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 500;
  overflow-x: hidden;
  .ds-status {
    margin: 0;
  }
`;

export const Copyable = styled.div`
  visibility: hidden;
  position: relative;
  opacity: 0;
  margin-left: 8px;
  svg {
    color: ${(props): string => props.theme.palette['grey-600']};
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
  &:hover {
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const RowWrapper = styled.div<{ copyable: boolean }>`
  width: 100%;
  ${Copyable} {
    ${(props): FlattenSimpleInterpolation | false => {
      return (
        props.copyable &&
        css`
          cursor: pointer;
        `
      );
    }}
  }
  &:hover {
    ${Copyable} {
      visibility: visible;
      opacity: 1;
    }
  }
  a,
  [href] {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const PrefixWrapper = styled.div`
  margin-right: 8px;
`;

export const SuffixWrapper = styled.div`
  margin-left: 8px;
  .ds-button {
    margin-left: 16px;
  }
`;

export const ValueWrapper = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  width: 100%;
`;

export const StarWrapper = styled.div<{ hasPrefixEl: boolean }>`
  margin-right: ${(props): string => (props.hasPrefixEl ? '16px' : '8px')};
`;
