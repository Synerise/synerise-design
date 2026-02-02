import styled, { css } from 'styled-components';

import Panel from '@synerise/ds-panel';
import {
  AdditionalData,
  RadioWrapper,
} from '@synerise/ds-radio/dist/Radio.styles';
import Scrollbar from '@synerise/ds-scrollbar';
import { Title as TypographyTitle } from '@synerise/ds-typography';

const sectionTitleCSS = css`
  margin-bottom: 8px;
`;

const modalContentCSS = css`
  padding: 36px 48px 48px;
`;

export const ConfirmationModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  ${modalContentCSS}
  gap: 24px;
`;

export const PromptContent = styled.div`
  ${modalContentCSS}
`;

export const ConfirmationModalContentMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;

export const Title = styled(TypographyTitle)`
  margin: 0;
`;

export const FooterRight = styled.div`
  flex: 1 1 auto;
`;

export const FooterLeft = styled.div`
  flex: 1 1 auto;
  text-align: left;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ConfirmationExtra = styled.div``;

export const ConfirmationExtraTitle = styled(TypographyTitle)`
  ${sectionTitleCSS}
`;

export const BatchItemsList = styled(Scrollbar)``;

export const AdditionalInfo = styled(Panel)`
  padding: 8px 18px;
`;

export const DecisionOptions = styled(Panel)`
  ${RadioWrapper} {
    padding: 7px 0;
    margin-bottom: 0;
  }
  ${AdditionalData}:empty {
    display: none;
  }
  padding: 8px 18px;
`;

export const ModalBackTitle = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
