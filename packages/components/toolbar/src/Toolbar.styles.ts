import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
export const ToolbarLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-weight: 500;
  color: ${props => props.theme.palette['grey-600']};
`;

export const ToolbarGroup = styled.div<{ isCompact?: boolean }>`
  display: flex;
  ${props => !props.isCompact && `gap: 4px`};
  background: ${props => props.theme.palette.white};
  padding: 4px;
  border-radius: 3px;
  align-content: center;
  box-shadow: 0px 4px 12px 0px ${props => props.theme.palette['grey-900']}0A;
`;
