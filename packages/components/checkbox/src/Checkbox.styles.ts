import styled, { css } from 'styled-components';
import BaseAntCheckbox from 'antd/lib/checkbox';

const soloCss = css`
  padding: 4px;
  display: inline-block;
`;

export const AntdCheckbox = styled(BaseAntCheckbox)`
  && {
    padding: 8px 12px;
    display: block;

    ${(props): string => props.solo && soloCss};
  }
`;

export const AdditionalData = styled.div`
  margin-left: 32px;
  margin-top: 4px;
`;

export const CheckboxWrapper = styled.div``;
