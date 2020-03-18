import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ListItem = styled.div`
  width: 16.666%;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;
export const OverlayWrapper = styled.div`
  padding: 4px 8px;
`;

export const Overlay = styled.div`
  width: 248px;
  min-height: 260px;
  max-height: 330px;
  overflow-y: scroll;
  background-color: ${(props): string => props.theme.palette.white};

  ${OverlayWrapper}:not(:last-child) {
    &::after {
      content: '';
      display: flex;
      width: calc(100% - 6px);
      height: 1px;
      background-image: linear-gradient(to right, ${({theme}): string => theme.palette.white} 40%, ${({theme}): string => theme.palette['grey-300']} 100%, transparent 0%);
      background-position: 0 bottom; 
      background-size: 4px 1px;
      background-repeat: repeat-x;
      margin: 4px auto 0;
    }
  }
   
  ${OverlayWrapper}:nth-child(2) {
    padding-top: 8px;
  }
`;

export const Title = styled.div`
  font-size: 10px;
  line-height: 1.6;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-500']};
  padding: 0 4px 8px 4px;
`;

export const FontIcon = styled.div`
  font-family: 'apple color emoji,segoe ui emoji,noto color emoji,android emoji,emojisymbols,emojione mozilla,twemoji mozilla,segoe ui symbol';
  font-size: 18px;
  line-height: 35px;
  margin-left: 3px;
`;

export const IconTrigger = styled.div`
  display: inline-block;
  
  &&& {
    .icon-wrapper {
      display: flex;
      pointer-events: none;
      svg {
        fill: currentColor;
      }
    }  
  }
`;

export const Button = styled.div``;

