import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const Header = styled.div`
  background: #ffffff;
  padding: 24px;
  display: flex;
  justify-content: space-between;
`;

export const SelectionHeader = styled(Header)`
  background: ${(props): string => props.theme.palette['blue-600']};
`;

export const Size = styled.div`
  ${macro.medium};
  color: #fff;
  b {
    ${macro.h400};
    color: inherit;
  }
`;

export const Title = styled.div`
  ${macro.h400};
`;

export const SubTitle = styled.div`
  ${macro.small};
  border-left: 1px solid ${(props): string => props.theme.palette['grey-200']};
  color: ${(props): string => props.theme.palette['grey-800']};
  margin-left: 24px;
  padding: 0 24px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  direction: rtl;
`;

export const InputWrapper = styled.div<{ isOpen?: boolean }>`
  ${(props): string => (props.isOpen ? `width: 100%` : 'width: 30px')};
  transition: all 0.5s ease;
  position: relative;
  display: flex;
  align-items: center;
  direction: ltr;

  .search-input {
    width: 0;
  }
`;

export const Icon = styled.div`
  transition: all 0.5s ease;
  position: absolute;
  left: 4px;
  z-index: 1;
  pointer-events: none;
`;

export const Input = styled.div<{ isOpen?: boolean }>`
  ${(props): string => (props.isOpen ? `opacity: 1` : 'opacity: 0')};
  transition: all 0.2s ease;
  overflow: hidden;
  position: relative;
  right: 0;

  & {
    input {
      padding: 4px 12px 4px 32px;
      ${(props): string => (props.isOpen ? `cursor: initial;` : 'cursor: pointer')};
    }
  }

  > div {
    margin: 0;
  }
`;
