import styled from 'styled-components';

import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { Input, type StyledInput } from '@synerise/ds-input';
import { InputNumberContainer } from '@synerise/ds-input-number/dist/InputNumber.styles';

export const RelativeDateDropdownWrapper = styled(Dropdown.Wrapper)`
  padding: 24px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  min-width: 420px;
  ${InputNumberContainer} {
    width: 70px;
  }
  & > * {
    flex: 1 1 auto;
  }
`;
export const RelativeDateDropdownFooter = styled.div`
  background: ${(props) => props.theme.palette['grey-100']};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
`;

export const RelativeDateCurrentLabel = styled.div`
  font-weight: 500;
`;
export const IconWrapper = styled.div``;

export const ClearIcon = styled(Icon)``;
export const ChevronIcon = styled(Icon)``;

export const Trigger: StyledInput = styled(Input)`
  ${ClearIcon} {
    display: none;
  }
  &:hover {
    ${ClearIcon} {
      display: block;
      svg {
        fill: ${(props) => props.theme.palette['red-600']};
      }
      &:hover svg {
        fill: ${(props) => props.theme.palette['red-500']};
      }
    }
    ${ChevronIcon} {
      display: none;
    }
  }
`;
