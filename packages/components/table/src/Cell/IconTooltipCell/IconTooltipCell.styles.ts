import styled from 'styled-components';

export const IconTooltipCell = styled.span<{ isDisabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-start;
  ${props => props.isDisabled && 'opacity: 0.4;'}
  .main-icon {
    svg {
      fill: ${props => props.theme.palette['grey-600']};
    }
  }
  .tooltip-icon {
    svg {
      fill: ${props => props.theme.palette['grey-400']};
    }
  }
`;
export const Label = styled.span`
  margin-left: 4px;
  display: flex;
  white-space: nowrap;
`;
