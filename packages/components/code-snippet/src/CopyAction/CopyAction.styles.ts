import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const IconWrapper = styled.div<{ customTriggerComponent?: boolean }>`
  margin-left: ${(props): string => (props.customTriggerComponent ? '8px' : '0')};
`;
