import styled from 'styled-components';

import Scrollbar from '@synerise/ds-scrollbar';
import { Title } from '@synerise/ds-typography';

import { FOOTER_HEIGHT, HEADER_HEIGHT, WRAPPER_HEIGHT } from './Tray.const';

export const TrayContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TrayScrollbar = styled(Scrollbar)`
  min-height: 0;
  display: flex;
  flex-direction: column;
  .scrollbar-container {
    min-height: 0;
  }
`;

export const TrayWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${(props) => props.theme.variables['zindex-tooltip']};
  box-shadow: var(--ds-shadows-shadow-2);
  width: 400px;
  border-radius: 3px;
  max-height: ${WRAPPER_HEIGHT}px;
  display: flex;
  flex-direction: column;
  background: var(--ds-modal-container-bg);
`;

export const TrayHeader = styled.div`
  height: ${HEADER_HEIGHT}px;
  flex: 0 0 ${HEADER_HEIGHT}px;
  padding-left: 18px;
  padding-right: 12px;
  /* ⚑ Shift: header border grey-200 → grey-100 (reuses modal header border; lighter). */
  border-bottom: solid 1px var(--ds-modal-header-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TrayHeaderLeft = styled.div``;
export const TrayHeaderRight = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const TrayFooter = styled.div`
  border-top: solid 1px var(--ds-modal-footer-border-color);
  background: var(--ds-modal-footer-bg);
  height: ${FOOTER_HEIGHT}px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  flex: 0 0 ${FOOTER_HEIGHT}px;
`;

export const TrayTitle = styled(Title)`
  margin: 0;
`;
