import styled from 'styled-components';

export const BlankItemWrapper = styled.div<{ rowGap: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.rowGap}px;
`;
export const BlankItemContent = styled.div`
  flex: 1 1 auto;
`;
export const BlankItemActions = styled.div`
  flex: 0 1 auto;
  svg:hover {
    fill: ${props => props.theme.palette['blue-600']};
  }
`;
export const DragHandle = styled.div`
  flex: 0 1 auto;
  cursor: grab;
  svg {
    fill: ${props => props.theme.palette['grey-400']};
  }
  &:hover {
    svg {
      fill: ${props => props.theme.palette['grey-600']};
    }
  }
`;
