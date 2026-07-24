import styled, { css } from 'styled-components';

export const ListRoot = styled.div<{ $bordered?: boolean }>`
  position: relative;
  ${(props) =>
    props.$bordered &&
    css`
      border: 1px solid ${props.theme.palette['grey-300']};
      border-radius: 3px;
    `}
`;

/** Reproduces the `.ant-list-header` styling the migration kept in `list.mixin.less`. */
export const ListHeader = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  color: ${({ theme }): string => theme.palette['grey-700']};
  padding: 8px 12px;
  border: 0;
`;

/** The `<ul class="ant-list-items">` — reset so items sit flush (antd parity). */
export const ListItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
