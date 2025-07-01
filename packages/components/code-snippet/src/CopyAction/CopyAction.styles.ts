import styled from 'styled-components';

export const IconWrapper = styled.div<{ customTriggerComponent?: boolean }>`
  margin-left: ${(props): string =>
    props.customTriggerComponent ? '8px' : '0'};
`;
