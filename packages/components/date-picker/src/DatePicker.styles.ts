import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.palette.white};
  user-select: none;
  padding-top: 12px;
  > *:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.palette['grey-200']};
  }
  .ds-date-picker-nav {
    .long-prev,
    .long-next {
      display: none;
    }
  }
`;
export const ContentWrapper = styled.div<{ withQuickPicks?: boolean }>`
  ${(props) =>
    props.withQuickPicks &&
    `
    display: flex;
    justify-content: center;
    `}
`;
export const PickerWrapper = styled.div`
  display: grid;
  min-width: 318px;
  align-items: stretch;
  justify-content: stretch;
  grid-template-rows: 48px 300px 1fr;
`;
export const OverlayContainer = styled.div`
  overflow: visible;
  min-width: 318px;
`;
