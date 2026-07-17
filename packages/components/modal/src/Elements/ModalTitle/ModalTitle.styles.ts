import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import { Title as TypographyTitle } from '@synerise/ds-typography';

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
  min-height: 40px;
  && {
    .close-modal {
      line-height: 1;
    }
  }
`;

export const Title = styled(TypographyTitle)`
  width: 100%;
  color: var(--ds-modal-header-title-color);
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
  border-bottom: 1px solid var(--ds-color-border-base-default);
`;

export const ModalHeaderTop = styled.div`
  border-bottom: 1px solid var(--ds-modal-header-border-color);
`;

export const ModalTitleWrapper = styled.div<{
  withDescription?: boolean;
  withTabs?: boolean;
}>`
  padding: 16px 24px;
  font-size: 18px;
  line-height: 32px;
`;

export const Description = styled.div`
  font-size: 13px;
  font-weight: normal;
  line-height: 18px;
  color: var(--ds-color-text-base-muted);
  display: block;
  padding: 12px 0 0;
  margin: 14px 0 0;

  background-image: linear-gradient(
    to right,
    var(--ds-color-border-base-strong) 33%,
    var(--ds-color-background-base-default) 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;

export const TabsWrapper = styled.div`
  padding-bottom: 1px;
  padding: 0 24px;
`;
