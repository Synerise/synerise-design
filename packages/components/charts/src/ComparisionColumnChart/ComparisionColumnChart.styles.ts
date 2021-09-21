import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
`;

export const ChartWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 100%;
`;

export const ChartLegend = styled.div`
  display: flex;
  margin: 20px 0 10px 10px;
`;

export const LegendItem = styled.div<{ inactive?: boolean }>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  cursor: pointer;
  user-select: none;
  ${props =>
    props.inactive &&
    css`
      opacity: 0.4;
    `}
`;

export const LegendColor = styled.div<{ color?: string; inactive?: boolean }>`
  background: ${props => props.color};
  border-radius: 5px;
  width: 5px;
  height: 5px;
  margin-right: 10px;
  ${props =>
    props.inactive &&
    css`
      background: #ddd;
    `}
`;
export const LegendText = styled.div``;
