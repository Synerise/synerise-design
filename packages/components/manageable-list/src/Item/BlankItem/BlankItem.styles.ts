import styled from 'styled-components';

export const BlankItemActions = styled.div`
  opacity: 0;
  flex: 0 1 auto;
  transition: opacity 0.2s;
  svg:hover {
    fill: ${(props) => props.theme.palette['blue-600']};
  }
`;
export const DragHandle = styled.div`
  flex: 0 1 auto;
  cursor: grab;
  svg {
    fill: ${(props) => props.theme.palette['grey-400']};
  }
  &:hover {
    svg {
      fill: ${(props) => props.theme.palette['grey-600']};
    }
  }
`;
export const BlankItemWrapper = styled.div<{
  rowGap: number;
  isDragPlaceholder?: boolean;
  isDragOverlay?: boolean;
}>`
  ${(props) =>
    props.isDragPlaceholder &&
    `  
    background: ${props.theme.palette['blue-050']};
    border: 1px dashed ${props.theme.palette['blue-300']};
    border-radius: 3px;
    ${BlankItemContent}, ${BlankItemActions}, ${DragHandle} {
      visibility: hidden;
      opacity: 0;
    }
  `}
  ${(props) =>
    props.isDragOverlay &&
    `
    box-shadow: 0px 16px 32px 0px ${props.theme.palette['grey-200']};
    background: ${props.theme.palette.white};
    `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.rowGap}px;
  &:hover {
    ${BlankItemActions} {
      opacity: 1;
    }
  }
`;
export const BlankItemContent = styled.div`
  flex: 1 1 auto;
`;
