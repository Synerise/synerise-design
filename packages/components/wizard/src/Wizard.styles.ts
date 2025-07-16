import styled from 'styled-components';

export const WizardWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1500;
  background-color: ${(props): string => props.theme.palette.white};

  && .ds-layout__header {
    overflow: visible;
  }
`;

export const WizardHeader = styled.div<{ withHeaderAction?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-right: 16px;
  &:after {
    content: '';
    display: flex;
    height: 40px;
    width: 1px;
    background-color: ${(props): string => props.theme.palette['grey-200']};
    position: absolute;
    right: 0;
    top: ${(props): string => (props.withHeaderAction ? '-4px' : '-8px')};
  }
`;

export const WizardStepper = styled.div`
  margin-right: 24px;
`;
export const WizardHeaderAction = styled.div`
  margin-right: 24px;
`;

export const WizardContainer = styled.div<{
  contentWidth?: string;
  withFooter: boolean;
}>`
  background-color: ${(props): string => props.theme.palette.white};
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 122px;
  padding-bottom: ${(props): string => (props.withFooter ? '80px' : '0')};
`;

export const WizardButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 48px 0 0;
`;

export const WizardContent = styled.div<{ contentWidth?: string }>`
  width: ${(props): string =>
    props.contentWidth ? props.contentWidth : '100%'};
  max-width: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ModalWizardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ButtonPlaceholder = styled.span``;

export const ModalWizardButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ModalWizardButtonsInfix = styled.div`
  align-self: center;
  display: flex;
`;
export const ModalWizardButtonsSuffix = styled.div`
  align-self: flex-end;
  display: flex;
`;
export const ModalWizardButtonsPrefix = styled.div`
  align-self: flex-start;
  display: flex;
`;

export const FooterLeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const FooterRightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  ${ButtonPlaceholder} {
    display: none;
  }
`;

export const WizardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 48px);
  padding: 15px 0;
  margin: 0 24px;
  background-color: ${(props) => props.theme.palette.white};
  border-top: 1px solid ${(props) => props.theme.palette['grey-200']};
  position: fixed;
  bottom: 0;
  left: 0;
  & > * {
    margin-right: 8px;
  }

  ${FooterLeftSide}:empty, ${FooterRightSide}:empty {
    display: none;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 16px;
  padding-right: 24px;
  position: relative;
  .ds-stepper {
    margin-right: 24px;
  }
  &:after {
    content: '';
    display: flex;
    height: 40px;
    width: 1px;
    background-color: ${(props): string => props.theme.palette['grey-200']};
    position: absolute;
    right: 0;
    top: -4px;
  }
`;
