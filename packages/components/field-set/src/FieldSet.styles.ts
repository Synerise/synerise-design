import styled from 'styled-components';

export const Title = styled.div<{ description?: boolean | React.ReactNode }>`
  display: flex;
  line-height: 16px;
  padding-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  word-wrap: break-word;
  align-items: center;
  color: ${(props): string => props.theme.palette['grey-800']};
`;
export const ContainerWrapper = styled.div``;
export const HeaderWrapper = styled.div`
  display: flex;
`;
export const ButtonWrapper = styled.div`
  display: flex;
`;
export const ActionButton = styled.div`
  display: flex;
  padding; 8px;
  
`;
export const ExpanderWrapper = styled.div<{ description?: boolean | React.ReactNode }>`
  display: flex;
  align-items: ${(props): string => (props.description ? '' : 'center')};
  margin: 0 16px 8px 0;
`;
export const FieldSetTitle = styled.div<{ description?: boolean | React.ReactNode }>`
  display: ${(props): string => (props.description ? '' : 'flex')};
  align-items: ${(props): string => (props.description ? '' : 'center')};
`;
export const ComponentWrapper = styled.div`
  display: flex;
  padding: 16px 4px;
`;

export const Description = styled.div<{ description?: boolean | React.ReactNode }>`
  display: flex;
  line-height: 16px;
  padding-bottom: ${(props): string => (props.description ? '8px' : '0')};
  font-size: 12px;
  word-wrap: break-word;
  text-align: center;
`;
