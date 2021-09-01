import styled from 'styled-components';
import ButtonGroup from '@synerise/ds-button-group';

export const Wrapper = styled.div`
  margin-right: 12px;
  background-color: ${(props): string => props.theme.palette.white};
  color: ${(props): string => props.theme.palette['grey-600']};
`;
export const WrapperButton = styled.div`
  background-color: ${(props): string => props.theme.palette.white};
`;
export const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: ${(props): string => props.theme.palette['grey-050']};
`;
export const ToolbarButtons = styled(ButtonGroup)`
  .ant-btn-group {
    margin: 0px;
  }
`;
export const ViewPercent = styled.div`
  padding: 8px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-600']};
`;
