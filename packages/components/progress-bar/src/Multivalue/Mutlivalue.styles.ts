import styled from 'styled-components';

export const Multivalue = styled.div<{ color: string; percent: number}>`
background: ${(props): string => props.color};
width:${(props): number => props.percent}%;
height: 6px;
border-radius: 6px;
text-indent: 100%;
overflow: hidden;
margin-top: -6px;



`;
export const Container = styled.div<{}>`
position:relative;
height: 16px;
padding-top: 11px;
flex-wrap: wrap;
justify-content: flex-start;
${Multivalue}:not(:first-child){
border-top-right-radius: 0px ;
border-bottom-right-radius: 0px;
border-right: 2px solid white;
}
`;


