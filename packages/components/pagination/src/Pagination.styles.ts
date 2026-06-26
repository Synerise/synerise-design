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
  color: ${(props) => props.theme.palette['grey-600']};

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
    color: ${(props) => props.theme.palette['grey-700']};
    text-decoration: none;
  }

  &:hover {
    background-color: ${(props) => `${props.theme.palette['grey-400']}66`};
  }

  ${(props) =>
    props.$active &&
    css`
      && {
        border-color: ${props.theme.palette['grey-700']};
        background-color: ${props.theme.palette['grey-700']};

        a {
          color: ${props.theme.palette.white};
        }

        &:hover a {
          color: ${props.theme.palette.white};
        }
      }
    `}
`;

export const Nav = styled.li<{ $disabled?: boolean; $side?: 'prev' | 'next' }>`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.palette['grey-600']};

  /* prev sits left of the page items, next sits right — independent of list position */
  ${(props) => props.$side === 'prev' && 'margin-right: 8px;'}
  ${(props) => props.$side === 'next' && 'margin-left: 8px;'}

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.4;
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
  color: ${(props) => props.theme.palette['grey-600']};
`;

export const JumperInput = styled.input`
  width: 50px;
  height: 32px;
  margin: 0 8px;
  padding: 7px 12px;
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 3px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => props.theme.palette['blue-600']};
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['blue-600']};
  }
`;
