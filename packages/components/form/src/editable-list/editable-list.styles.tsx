import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const RowWrapper = styled.div`
  @media (min-width: 1280px) {
    display: flex;
    padding: 8px 200px 8px 0px;
    align-items: center;
  }
  padding: 8px 0px 8px 0px;
`;
export const AutoCompleteWrapper = styled.div`
  padding-right: 10px;
  margin-bottom: 15px;
`;
export const ButtonWrapper = styled.div``;
export const AddButton = styled(Button)`
  span {
    padding: 0 4px;
  }
`;
export const AddIconWrapper = styled.div`
  display: inline-block;
`;
export const CrudWrapper = styled.div<{ marginWithLabel?: boolean | React.ReactNode }>`
  padding-left: 4px;
  margin: ${(props): string => (props.marginWithLabel ? '8px 0 0' : '0 0 16px')};
`;
export const InputWrapper = styled.div`
  padding-left: 4px;
`;
