import styled from 'styled-components';
import Typography from '@synerise/ds-typography';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

export const Title = styled.span`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-800']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled(Typography.Text)`
  font-size: 13px;
  display: block;
  padding: 4px 0 0;
  margin: 8px 0 -16px;

  background-image: linear-gradient(
    to right,
    ${(props): string => props.theme.palette['grey-300']} 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
