import styled from 'styled-components';

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const MoreInfo = styled.div`
  width: 24px;
  height: 24px;
  font-size: 11px;
  box-shadow: 0 0 0 1px ${(props): string => props.theme.palette['grey-300']};
  margin-left: 8px;
  border-radius: 50%;
  color: ${(props): string => props.theme.palette['grey-400']};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.45;
  cursor: pointer;
  position: relative;
  &:after {
    content: '';
    border-radius: 50%;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    top: 1px;
    left: 1px;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 0 0 2px transparent;
    box-sizing: border-box;
  }
  &:hover {
    &:after {
      box-shadow: 0 0 0 1px ${(props): string => props.theme.palette['grey-200']};
    }
  }
`;

export const Labels = styled.span`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: calc(100% - 32px);
`;
