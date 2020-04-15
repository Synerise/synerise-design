import styled from 'styled-components';
import { OuterWrapper } from '@synerise/ds-input/dist/Input.styles';

export const ColumnManagerActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props): string => props.theme.palette['grey-050']};
  padding: 24px;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const RightButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-left: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 282px;
  margin: 16px auto 0;

  ${OuterWrapper} {
    margin-bottom: 24px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  > div {
    display: flex;
  }
`;
