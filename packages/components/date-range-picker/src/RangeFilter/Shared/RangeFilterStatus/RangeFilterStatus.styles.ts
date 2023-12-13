import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const BadgeWrapper = styled.div`
  margin-right: 16px;
  margin-bottom: -2px;
`;

export const Title = styled.h3`
  font-size: 16px;
  line-height: 1.39;
  color: ${(props): string => props.theme.palette['grey-800']};
  margin-bottom: 1em;
`;

export const SuffixText = styled.span`
  color: ${(props): string => props.theme.palette['blue-600']};
  font-weight: 500;
  margin-right: 16px;
`;
export const CreatorButton = styled(Button.Creator)`
  &&& {
    justify-content: flex-start;
  }
`;
export const Container = styled.div`
  padding: 16px 24px 24px;
`;
