import styled from 'styled-components';

export const MenuWrapper = styled.div<{ top: number }>`
  background: var(--ds-app-menu-container-bg);
  height: calc(100% - ${(props): number => props.top}px);
  position: fixed;
  left: 0;
  top: ${(props): number => props.top}px;
  width: 60px;
  box-shadow: var(--ds-shadows-shadow-1);
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 12px;
  transition: all 0.25s cubic-bezier(0.95, 0.17, 0.27, 0.79);
  transition-delay: 0.25s;
  overflow: hidden;

  &.menu--opened {
    transition-delay: 0s;
    width: 322px;
  }
`;

export const ItemsWrapper = styled.ul`
  padding: 12px 0 0;
  margin: 0;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  display: flex;
  flex-flow: column;
  align-items: center;
  z-index: 2;
  list-style: none;
`;

export const ItemsDivider = styled.div`
  width: 40px;
  border-bottom: 1px solid var(--ds-color-border-base-subtle);
  flex: 1 1 auto;
`;
