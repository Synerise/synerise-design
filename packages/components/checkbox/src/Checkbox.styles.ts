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
    display: flex;
    align-items: center;
    line-height: 1;
    ${(props: Props): FlattenSimpleInterpolation | undefined | false => props.solo && soloCss};
    .ant-checkbox {
      top: 0;
    }
  }
`;

export const AdditionalData = styled.div`
  margin: 2px 12px 0px 28px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  padding: 4px 12px 8px 8px;
  flex-direction: column;
`;
