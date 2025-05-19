import styled, { css } from 'styled-components';
import { Title as TypographyTitle } from '@synerise/ds-typography';
import Scrollbar from '@synerise/ds-scrollbar';
import { RadioWrapper, AdditionalData } from '@synerise/ds-radio/dist/Radio.styles';

const roundedWrapperCSS = css`
  border: solid ${props => props.theme.palette['grey-200']} 1px;
  border-radius: 8px;
  padding: 8px;
`;

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

export const BatchItemsList = styled(Scrollbar)`
  ${roundedWrapperCSS}
`;

export const AdditionalInfo = styled.div`
  ${roundedWrapperCSS}
`;

export const DecisionOptions = styled.div`
  ${RadioWrapper}:last-of-type {
    margin-bottom: 0;
  }
  ${AdditionalData}:empty {
    display: none;
  }
  ${roundedWrapperCSS}
`;
