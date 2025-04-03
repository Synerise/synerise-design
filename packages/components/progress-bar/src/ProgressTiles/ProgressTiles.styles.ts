import styled from 'styled-components';

export const TileContainer = styled.div<{ width: string }>`
  position: relative;
  margin-right: 2px;
  width: ${props => props.width};
  height: 6px;
  background: ${props => props.theme.palette['grey-200']};
`;

export const TileProgress = styled.div<{ color: string; width: string }>`
  position: absolute;
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color};
`;

export const TilesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .progress-bar-label {
    margin-bottom: 12px;
    cursor: pointer;
  }

  .progress-bar-wrapper {
    display: flex;
  }

  ${TileContainer}:first-of-type {
    border-radius: 3px 0 0 3px;

    ${TileProgress}:first-of-type {
      border-radius: 3px 0 0 3px;
    }
  }

  ${TileContainer}:last-of-type {
    border-radius: 0 3px 3px 0;

    ${TileProgress}:last-of-type {
      border-radius: 0 3px 3px 0;
    }
  }
`;
