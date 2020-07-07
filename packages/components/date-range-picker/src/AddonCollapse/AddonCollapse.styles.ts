import styled from 'styled-components';

export const AddonWrapper = styled.div``;
export const Title = styled.h3`
  font-size: 16px;
  line-height: 20px;
  color: ${(props): string => props.theme.palette['grey-800']};
`;
export const AddonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: no-wrap;
`;
export const Content = styled.div``;
