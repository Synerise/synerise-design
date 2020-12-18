import styled from 'styled-components';

export const WizardWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

export const WizardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 24px;
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
    top: -4px;
  }
`;

export const WizardStepper = styled.div``;
export const WizardHeaderAction = styled.div`
  margin-left: 24px;
`;

export const WizardContainer = styled.div<{ contentWidth?: string; withFooter: boolean }>`
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

export const WizardContent = styled.div<{ contentWidth?: string }>`
  width: ${(props): string => (props.contentWidth ? props.contentWidth : '100%')};
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

export const WizardButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 48px 0 0;
`;

export const ModalWizardButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const WizardFooter = styled.div`
  display: flex;
  width: calc(100% - 48px);
  padding: 15px 0;
  margin: 0 24px;
  background-color: ${(props): string => props.theme.palette.white};
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
  position: fixed;
  bottom: 0;
  left: 0;
  & > * {
    margin-right: 8px;
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
