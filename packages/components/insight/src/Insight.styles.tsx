import styled from 'styled-components';

export const InsightContainer = styled.div<{ hasHover?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: var(--ds-color-background-base-default);
  gap: 16px;
  padding: 24px;
  width: 100%;
  border-bottom: solid 1px var(--ds-color-border-base-default);
  ${(props) =>
    props.hasHover &&
    `&:hover {
    background-color: var(--ds-color-background-base-defaulthover);
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
  color: var(--ds-color-text-base-default);
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
