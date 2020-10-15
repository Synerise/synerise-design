import styled from 'styled-components';


export const ContentWrapper = styled.div<{withFolder: boolean}>`
padding: 12px 140px 12px 0;
margin-top: ${(props): string => props.withFolder ? '0': '-17px' };
border-bottom: 1px dashed ${(props): string =>props.theme.palette['grey-300']};
`;

export const TagsWrapper = styled.div`
padding: 22px 0 0;
border-bottom: 1px dashed ${(props): string =>props.theme.palette['grey-300']};
margin-left: -2px;
`;
export const InlineEditWrapper = styled.div`
padding: 12px 0;
margin-left: 1px;
white-space: pre;
.ds-inline-edit > div:nth-child(2){
background-color: ${(props): string =>props.theme.palette.white};

}
`;
export const DrawerContent = styled.div`
  padding: 0px;
`;

