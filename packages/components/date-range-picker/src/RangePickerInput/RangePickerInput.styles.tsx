import styled from 'styled-components';
import { InputWrapper } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { Label as DSLabel } from '@synerise/ds-input';

export const Container = styled.div``;

export const ClearIconWrapper = styled.div`
  margin-left: 3px;
  .ds-icon > svg {
    fill: ${props => props.theme.palette['red-600']};
  }
  &:hover {
    .ds-icon > svg {
      fill: ${props => props.theme.palette['red-600']};
    }
  }
`;

export const DefaultIconWrapper = styled.div`
  margin-left: 3px;
  &&:hover {
    .ds-icon > svg {
      fill: ${props => props.theme.palette['grey-600']};
    }
  }
`;

export const RangeInputWrapper = styled(InputWrapper)<{
  error?: boolean;
  focus?: boolean;
  disabled?: boolean;
  hover?: boolean;
  active?: boolean;
}>`
  display: flex;
  align-items: center;
  & {
    opacity: 1;
    padding: 2px 8px 2px 12px;
  }
  ${DefaultIconWrapper} {
    opacity: 0.4;
  }
`;
export const DateWrapper = styled.div<{ highlight?: boolean }>`
  color: ${props => (props.highlight ? props.theme.palette['blue-600'] : props.theme.palette['grey-500'])};
`;
export const DateValue = styled.div`
  color: ${props => props.theme.palette['grey-600']};
`;
export const IconSeparator = styled.div`
  display: flex;
  flex: 1;
`;
export const SuffixWrapper = styled.div``;
export const Label = styled(DSLabel)`
  margin-bottom: 8px;
`;
export const ErrorText = styled.div`
  color: ${props => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;
export const Description = styled.div`
  color: ${props => props.theme.palette['grey-600']};
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;
