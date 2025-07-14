import styled from 'styled-components';

export const QuickPicksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 47px;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 16px 16px 24px;
  border-top: 1px solid ${(props) => props.theme.palette['grey-200']};
`;
