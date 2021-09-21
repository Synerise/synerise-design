import styled from 'styled-components';

export const ListChartContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const ListChartTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props): string => props.theme.variable('@gray-color')};
`;

export const ListChartContent = styled.div`
  margin: 16px 0 0 0;
  display: flex;
  flex-flow: column;
`;

export const ListChartActions = styled.div`
  float: right;
`;

export const ToggleMore = styled.div`
  border-bottom: 1px solid ${(props): string => props.theme.variable('@gray-color-lighter-6')};
  padding-bottom: 8px;
  margin-top: 8px;
`;

export const ToggleMoreInfo = styled.span`
  margin-right: 4px;
`;

export const ToggleMoreBtn = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: 500;

  &:hover {
    text-decoration: inherit;
    color: inherit;
  }
`;
