import styled from 'styled-components';

export const IconLabelCell = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-start;
  .main-icon {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
  .tooltip-icon {
    svg {
      fill: ${(props): string => props.theme.palette['grey-400']};
    }
  }
`;
export const Label = styled.span`
  margin-left: 4px;
  display: flex;
  white-space: nowrap;
`;
