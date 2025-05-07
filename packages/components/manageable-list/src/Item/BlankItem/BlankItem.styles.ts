import styled from 'styled-components';

export const BlankItemActions = styled.div`
  opacity: 0;
  flex: 0 1 auto;
  transition: opacity 0.2s;
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
export const BlankItemWrapper = styled.div<{ rowGap: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.rowGap}px;
  &:hover {
    ${BlankItemActions} {
      opacity: 1;
    }
  }
`;
export const BlankItemContent = styled.div`
  flex: 1 1 auto;
`;
