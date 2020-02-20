import styled from 'styled-components';

export const ColumnManagerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const ListHeadline = styled.span`
  display: flex;
  width: 100%;
  font-size: 14px;
  line-height: 1.42;
  font-weight: 500;
  padding: 24px 24px 12px;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;
