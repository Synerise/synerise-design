import styled from 'styled-components';

import { BaseTableWrapper } from '../BaseTable/BaseTable.styles';

export const ScrollbarWrapper = styled.div<{ containerPadding?: number }>`
  position: sticky;
  bottom: 10px;
  transform: translate(5px, 24px);
  z-index: 20;
  height: 10px;
  margin-bottom: -10px;

  ${BaseTableWrapper}:hover & {
    .ps__rail-x {
      opacity: 1;
    }
  }
`;
export const ScrollbarContent = styled.div`
  width: var(--table-size);
  height: 1px;
  pointer-events: none;
`;
