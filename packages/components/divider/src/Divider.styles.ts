import styled from 'styled-components';
import AntdDivider from 'antd/lib/divider';

type Props = {
  marginTop?: number;
  marginBottom?: number;
};

// eslint-disable-next-line import/prefer-default-export
export const Divider = styled(AntdDivider)`
  && {
    ${(props: Props): string => (props.marginBottom ? `margin-bottom: ${props.marginBottom}px` : '')};
    ${(props: Props): string => (props.marginTop ? `margin-top: ${props.marginTop}px` : '')};
  }
`;
