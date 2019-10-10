import styled from 'styled-components';
import AntdDivider from 'antd/lib/divider';

// eslint-disable-next-line import/prefer-default-export
export const Divider = styled(AntdDivider)`
  && {
    ${(props): string => props.marginBottom && `margin-bottom: ${props.marginBottom}px`};
    ${(props): string => props.marginTop && `margin-top: ${props.marginTop}px`};
  }
`;
