import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import BaseAntCheckbox from 'antd/lib/checkbox';

type Props = {
  solo: boolean;
};

const soloCss = css`
  padding: 4px;
  display: inline-block;
`;

export const AntdCheckbox = styled(BaseAntCheckbox)`
  && {
    display: block;

    ${(props: Props): FlattenSimpleInterpolation | undefined | false => props.solo && soloCss};
  }
`;

export const AdditionalData = styled.div`
  margin: 4px 8px 15px 28px;
`;

export const CheckboxWrapper = styled.div`
  margin-bottom: 15px;
`;
