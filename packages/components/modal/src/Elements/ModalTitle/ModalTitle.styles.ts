import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import { Title as TypographyTitle } from '@synerise/ds-typography';

const getBottomPadding = (withTabs: boolean, withDescription: boolean) => {
  if (withTabs) {
    return 0;
  }
  if (withDescription) {
    return 12;
  }
  return 20;
};

export const CloseButton: StyledButton = styled(Button)`
  &&& {
    position: absolute;
    top: 20px;
    right: 24px;
    z-index: 1;
    margin: 0;
  }
`;

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

export const Title = styled(TypographyTitle)`
  width: 100%;
  color: ${(props) => props.theme.palette['grey-800']};
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

  gap: 8px;
`;

export const BottomBar = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-100']};
`;

export const ModalTitleWrapper = styled.div<{
  withDescription?: boolean;
  withTabs?: boolean;
}>`
  padding: 20px 24px;
  padding-bottom: ${(props) =>
    getBottomPadding(!!props.withTabs, !!props.withDescription)}px;
  font-size: 18px;
  line-height: 32px;
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-100']};
`;

export const Description = styled.div`
  font-size: 13px;
  font-weight: normal;
  line-height: 18px;
  color: ${(props) => props.theme.palette['grey-600']};
  display: block;
  padding: 12px 0 0;
  margin: 14px 0 0;

  background-image: linear-gradient(
    to right,
    ${(props) => props.theme.palette['grey-300']} 33%,
    ${(props) => props.theme.palette['white']} 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;

export const TabsWrapper = styled.div`
  padding-bottom: 1px;
`;
