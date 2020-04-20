import styled from 'styled-components';
import ButtonGroup from '@synerise/ds-button-group';

export const FilterTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FilterButton = styled(ButtonGroup)<{ opened: boolean }>`
  button {
    background-color: ${(props): string =>
      props.opened ? props.theme.palette['grey-100'] : props.theme.palette.white};
  }
`;
