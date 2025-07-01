import styled from 'styled-components';

export const InlineCodeWrapper = styled.code`
  & {
    font-size: 12px;
    font-family: 'IBM Plex Mono Regular', monospace;
    display: inline-block;
    padding: 0 4px;
    margin-right: 4px;
    border-radius: 3px;
    color: #e31a5d;
    background-color: ${(props): string => props.theme.palette[`pink-100`]};
  }
`;
