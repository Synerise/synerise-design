import styled from 'styled-components';

import Button from '@synerise/ds-button';
import { ButtonLabel } from '@synerise/ds-button/dist/Button.styles';

export const CreateTagDropdownButton = styled(Button)<{ marginless: boolean }>`
  margin: ${(props): string => (props.marginless ? '0' : '0 0 8px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  position: absolute;

  ${ButtonLabel} {
    justify-content: flex-start;
  }

  && {
    font-weight: 400;
    text-align: left;
    width: 100%;
    justify-content: flex-start;
  }

  strong {
    font-weight: 500;
    margin: 0 0 0 3px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Separator = styled.hr`
  width: auto;
  margin: 0;
  padding: 0;
  padding-bottom: 8px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    ${(props) => props.theme.palette['grey-300']} 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;

export const AddTagButton = styled(Button)<{ isOpen?: boolean }>`
  flex: 0 0 auto;
  ${(props) => props.isOpen && ` &&&&& { visibility: visible }`}
`;
