import styled from 'styled-components';

export const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Avatar = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.span<{ withLabels: boolean }>`
  font-size: ${(props): string => (props.withLabels ? '16px' : '14px')};
  line-height: 20px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const Label = styled.span`
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 400;
  margin-top: 4px;
`;

export const Icon = styled.div`
  margin-right: 8px;
`;
