import styled from 'styled-components';
import Typography from '@synerise/ds-typography';
import Button from '@synerise/ds-button';

export const Container = styled.div``;

export const Description = styled(Typography.Text)`
  && {
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const Label = styled(Typography.Title)`
  && {
    font-size: 13px;
    margin: 0;
  }
`;

export const UploadButton = styled(Button)``;
