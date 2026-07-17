import styled, { css } from 'styled-components';

const FONT = "'Graphik LCG Web', sans-serif";

export const Root = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: ${FONT};

  * {
    font-family: ${FONT};
  }
`;

export const TotalText = styled.li`
  display: inline-flex;
  align-items: center;
  height: 32px;
  margin-right: 8px;
  color: var(--ds-color-text-base-muted);

  strong {
    font-weight: 500;
  }
`;

export const Item = styled.li<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  margin: 0 2px;
  border: 1px solid transparent;
  border-radius: 16px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;

  a {
    padding: 0 6px;
    color: var(--ds-pagination-item-text-color-default);
    text-decoration: none;
  }

  &:hover {
    background-color: var(--ds-pagination-item-bg-hover);
  }

  ${(props) =>
    props.$active &&
    css`
      && {
        border-color: var(--ds-pagination-item-bg-active);
        background-color: var(--ds-pagination-item-bg-active);

        a {
          color: var(--ds-pagination-item-text-color-active);
        }

        &:hover a {
          color: var(--ds-pagination-item-text-color-active);
        }
      }
    `}
`;

export const Nav = styled.li<{ $disabled?: boolean; $side?: 'prev' | 'next' }>`
  display: inline-flex;
  align-items: center;
  color: var(--ds-pagination-nav-icon-default);

  /* prev sits left of the page items, next sits right — independent of list position */
  ${(props) => props.$side === 'prev' && 'margin-right: 8px;'}
  ${(props) => props.$side === 'next' && 'margin-left: 8px;'}

  ${(props) =>
    props.$disabled &&
    css`
      opacity: var(--ds-pagination-nav-disabled-opacity);
      cursor: not-allowed;

      /* keep 'not-allowed' visible on the <li> while making the button inert */
      > * {
        pointer-events: none;
      }
    `}
`;

export const Jump = styled.li`
  display: inline-flex;
  align-items: center;
  margin: 0 8px;

  /*
   * Show the "…" (default-icon) and swap to the double-angle (hover-icon) on hover. The '&&&' raises
   * specificity above ds-button's own '& > .ds-icon { display: flex }' (same single-class
   * specificity), which would otherwise win the tie and keep both icons visible at rest.
   */
  &&& {
    .hover-icon {
      display: none;
    }
    &:hover {
      .default-icon {
        display: none;
      }
      .hover-icon {
        display: flex;
      }
    }
  }
`;

export const Options = styled.li`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  margin-left: 16px;
`;

export const SizeChanger = styled.div`
  min-width: 140px;
  margin-right: 16px;
`;

export const QuickJumper = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  color: var(--ds-color-text-base-muted);
`;

export const JumperInput = styled.input`
  width: 50px;
  height: 32px;
  margin: 0 8px;
  padding: 7px 12px;
  border: 1px solid var(--ds-color-border-base-strong);
  border-radius: 3px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: var(--ds-color-focus-base-default);
    box-shadow: inset 0 0 0 1px var(--ds-color-focus-base-default);
  }
`;
