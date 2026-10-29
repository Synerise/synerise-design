import styled from 'styled-components';

export const IconTooltipCell = styled.span<{ isDisabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-start;
  ${(props) => props.isDisabled && 'opacity: var(--ds-opacity-disabled);'}
  .main-icon {
    color: var(--ds-color-icon-base-default);
  }
  .tooltip-icon {
    color: var(--ds-color-icon-base-muted);
  }
`;
export const Label = styled.span`
  margin-left: 4px;
  display: flex;
  white-space: nowrap;
`;
