import styled from 'styled-components';
import Typography from '@synerise/ds-typography';
import Button from '@synerise/ds-button';

export const Container = styled.div``;

export const Description = styled(Typography.Text)`
  && {
    margin: 8px 0 0;
    display: block;
    color: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const DropAreaContainer = styled.div``;

export const DropArea = styled.div`
  display: flex;
  align-items: center;
  border: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  padding: 15px 12px;
  border-radius: 3px;

  span {
    display: inline-block;
    margin: 0 0 0 12px;
  }
`;

export const Label = styled(Typography.Title)`
  && {
    margin: 0 0 8px;
    font-size: 13px;
  }
`;

export const UploadButton = styled(Button)``;
