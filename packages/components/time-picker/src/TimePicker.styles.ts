import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Label } from '@synerise/ds-typography';

export const Container = styled.div`
  min-width: 104px;
  max-width: 208px;
  width: inherit;
  height: 32px;
  position: relative;
`;

export const OverlayContainer = styled.div`
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
`;

export const Unit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 192px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const UnitSeperator = styled.div`
  width: 1px;
  height: inherit;
  display: flex;
  flex-shrink: 0;
  background-color: ${(props): string => props.theme.palette['grey-200']};
`;

export const CellText = styled(Label)`
  && {
    width: 18px;
    height: 18px;
    text-align: center;
    color: ${(props): string => props.theme.palette['grey-600']};
    transition: color 0.3s;
  }
`;

export const Cell = styled.button<{ active?: boolean }>`
  height: 32px;
  text-align: center;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  cursor: pointer;
  background-color: ${(props): string => props.theme.palette.white};

  && {
    border: none;
    padding: 0;
  }

  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};

    ${CellText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
  }

  &:disabled {
    && {
      cursor: not-allowed;
      background-color: ${(props): string => props.theme.palette.white};
    }

    ${CellText} {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }

  ${(props): FlattenSimpleInterpolation | false | undefined =>
    props.active &&
    css`
      && {
        cursor: initial;
        background-color: ${props.theme.palette['blue-050']};
      }

      ${CellText} {
        cursor: initial;
        color: ${props.theme.palette['blue-600']};
      }
    `};
`;
