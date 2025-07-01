import styled from 'styled-components';

export const ScrollbarContent = styled.div``;

export const ScrollbarWrapper = styled.div<{
  absolute?: boolean;
  loading?: boolean;
  largeSize?: boolean;
}>`
  padding-right: ${(props): string => {
    if (props.absolute) {
      return '';
    }
    return props.largeSize ? '24px !important' : '11px !important';
  }};
  padding-bottom: ${(props): string => {
    if (props.absolute) {
      return '';
    }
    return props.largeSize ? '20px !important' : '11px !important';
  }};
  & > * {
    opacity: ${(props): string => (props.loading ? '0.2' : '1')};
    transition: all 0.25s ease-in-out;
  }
`;
