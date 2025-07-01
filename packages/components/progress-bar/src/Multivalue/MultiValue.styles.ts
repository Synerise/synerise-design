import styled, { css } from 'styled-components';

export const Multivalue = styled.div<{ color: string; percent: number }>`
  background: ${(props) => props.color};
  width: ${(props) => props.percent}%;
  height: 6px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: -6px;
`;
export const Container = styled.div<{ stackedBars: boolean }>`
  position: relative;
  height: 16px;
  width: 100%;
  padding-top: 11px;

  ${(props) =>
    props.stackedBars
      ? css`
          ${Multivalue}:not(:first-child) {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-right: 2px solid white;
          }
        `
      : css`
          justify-content: flex-start;
          display: flex;
          gap: 2px;
          ${Multivalue} {
            border-radius: 0;
            &:first-child {
              border-top-left-radius: 6px;
              border-bottom-left-radius: 6px;
            }
            &:last-child {
              border-top-right-radius: 6px;
              border-bottom-right-radius: 6px;
            }
          }
        `}
`;
