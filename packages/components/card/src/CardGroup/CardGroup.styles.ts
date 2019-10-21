import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Container as CardContainer } from '../Card/Card.styles';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div<{ items: number }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;

  ${(props): FlattenSimpleInterpolation | 0 =>
    props.items &&
    css`
    ${CardContainer} {
      margin: 12px;
      width: calc(${100 / props.items}% - 24px);

      &:nth-child(${props.items}n+1), &:nth-child(${props.items}n+${props.items}) {
        width: calc(${100 / props.items}% - 12px);
      }

      &:nth-child(${props.items}n+1):nth-child(${props.items}n+${props.items}) {
        width: ${100 / props.items}%;
      }

      &:nth-child(${props.items}n+1) {
        margin-left: 0;
      }

      &:nth-child(${props.items}n+${props.items}) {
        margin-right: 0;
      }

      &:nth-child(-n+${props.items}) {
        margin-top: 0;
      }

      &:nth-child(${props.items}n+1):nth-last-child(-n+${props.items}), &:nth-child(${
      props.items
    }n+1):nth-last-child(-n+${props.items}) ~ ${CardContainer} {
        margin-bottom: 0;
      }
    }
  `};
`;
