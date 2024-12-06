import styled from 'styled-components';
import InlineEdit, { InlineEditProps } from '@synerise/ds-inline-edit';

export const StyledInlineEditMenu = styled(InlineEdit)<InlineEditProps>`
  && .autosize-input > input {
    max-width: 100px;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.39;
    min-height: 18px;
    padding: 0;
    font-variant-numeric: tabular-nums;
  }
`;