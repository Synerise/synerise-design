import styled from 'styled-components';
import Typography from '@synerise/ds-typography';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  && {
    .close-modal {
      line-height: 1;
    }
  }
`;

export const Title = styled(Typography.Title)`
  width: 100%;
  color: ${props => props.theme.palette['grey-800']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  && {
    margin: 0;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .ant-btn {
    margin: 0 4px;
  }
  .close-modal {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0;
  }
`;

export const BottomBar = styled.div`
  border-bottom: 1px solid ${props => props.theme.palette['grey-100']};
`;
export const ModalTitleWrapper = styled.div<{ withDescription?: boolean }>`
  padding: ${props => (props.withDescription ? '20px 24px 12px' : '20px 24px')};
  font-size: 18px;
  line-height: 32px;
  border-bottom: 1px solid ${props => props.theme.palette['grey-100']};
`;

export const Description = styled.div`
  font-size: 13px;
  font-weight: normal;
  line-height: 18px;
  color: ${props => props.theme.palette['grey-600']};
  display: block;
  padding: 12px 0 0;
  margin: 14px 0 0;

  background-image: linear-gradient(
    to right,
    ${props => props.theme.palette['grey-300']} 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;
