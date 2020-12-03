import styled from 'styled-components';

export const RemoveIconWrapper = styled.div`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease-in-out;
  margin-left: 4px;
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .ds-select-wrapper {
    min-width: 20%;
    margin-right: 8px;
  }
  .ds-time-picker {
    max-width: 220px;
    width: 100%;
  }
  &:hover {
    ${RemoveIconWrapper} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
export const Row = styled.div<{ justifyContent: string }>`
  width: 100%;
  display: flex;
  justify-content: ${(props): string => props.justifyContent};
  min-height: 32px;
  margin: 8px 0;
`;
export const Separator = styled.span`
  & {
    line-height: 32px;
    height: 32px;
    margin: 0 8px;
  }
`;
