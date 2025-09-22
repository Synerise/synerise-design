import styled from 'styled-components';

export const InsightContainer = styled.div<{ hasHover?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.white};
  gap: 16px;
  padding: 24px;
  width: 100%;
  border-bottom: solid 1px ${(props) => props.theme.palette['grey-200']};
  ${(props) =>
    props.hasHover &&
    `&:hover {
    background-color: ${props.theme.palette['grey-050']};
  }`};
`;

export const InsightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;
export const SubTitle = styled.div`
  display: flex;
`;

export const Title = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  font-size: 14px;
`;

export const InsightHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InsightAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InsightTextWrapper = styled.div<{ avatar?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.avatar ? '12px' : '0')};
`;

export const InsightFooter = styled.div`
  display: flex;
`;
