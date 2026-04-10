import styled from 'styled-components';

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const MoreInfo = styled.div`
  font-size: 11px;
  margin-left: 8px;
  color: ${(props): string => props.theme.palette['grey-500']};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const Labels = styled.span`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: calc(100% - 32px);
`;
