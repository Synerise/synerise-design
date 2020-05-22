import styled from 'styled-components';
import { StatusTag } from '@synerise/ds-status/dist/Status.styles';

export const GroupRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupRowLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${StatusTag} {
    margin-left: 12px;
  }
`;

export const GroupSelection = styled.div`
  display: flex;
  padding: 0 24px 0 0;
`;

export const GroupValue = styled.div`
  display: flex;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const SubRow = styled.td<{ selected?: boolean }>`
  background-color: ${(props): string =>
    props.selected ? 'rgb(250, 248, 234)' : props.theme.palette['grey-050']} !important;
`;
